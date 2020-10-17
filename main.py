import datetime
import json
import eml_parser
import os
import flair
import sqlite3
import operator
from sqlite3 import Error
from collections import defaultdict



def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by the db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return conn


def json_serial(obj):
    if isinstance(obj, datetime.datetime):
        serial = obj.isoformat()
        return serial


def flair_set_up():
    flair_sentiment = flair.models.TextClassifier.load('en-sentiment')
    return flair_sentiment


flair_sentiment = flair_set_up()
database = "proofpoint_mockdata.db"
conn = create_connection(database)
with open('directory_path.config', 'rb') as config:
    directory = config.read().decode("utf-8")

for filename in os.listdir(directory):
    if filename.endswith(".eml"):
        print(filename)
        with open(filename, 'rb') as fhdl:
            raw_email = fhdl.read()

        ep = eml_parser.EmlParser(include_raw_body=True, include_attachment_data=True, )
        parsed_eml = ep.decode_email_bytes(raw_email)

        body = json.dumps(parsed_eml["body"][0]['content'], default=json_serial)


        s = flair.data.Sentence(body)
        flair_sentiment.predict(s)
        total_sentiment = s.labels
        label = str(total_sentiment[0]).split(' ')[0]  # Label
        rating = float(str(total_sentiment[0]).split(' ')[1].strip('()'))

        wordCounts = defaultdict(int)
        words = body.split(' ')
        for word in words: 
            wordCounts[word] += 1
        sortedWordCounts = sorted(wordCounts.items(),key=operator.itemgetter(1))
        if wordCounts['Trump'] > wordCounts['Biden']:
            keyword = 'Trump'
        elif wordCounts['Biden'] > wordCounts['Trump']:
            keyword = 'Biden'
            
        date = datetime.datetime.now()
        sql = '''INSERT INTO Testing (subject, sentiment_score, keyword, date, P_N) VALUES (?,?,?,?,?)'''
        vals = ('Election', rating, keyword, date, label)
        
        cur = conn.cursor()
        cur.execute(sql, vals)
        conn.commit()
