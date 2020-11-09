import datetime
import json
import eml_parser
import os
import flair
import sqlite3
import operator
import string
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
database = "proofpointDB.db"
conn = create_connection(database)
with open('directory_path.config', 'rb') as config:
    directory = config.read().decode("utf-8")

for filename in os.listdir(directory):
    if filename.endswith(".eml"):
        print(filename, end='')
        with open(filename, 'rb') as fhdl:
            raw_email = fhdl.read()

        ep = eml_parser.EmlParser(include_raw_body=True, include_attachment_data=False, )
        parsed_eml = ep.decode_email_bytes(raw_email)
        #checks if there is an attachment in the email by checking
        #if there is an attachment key in the parsed eml file
        if ('attachment' in parsed_eml.keys()):
            attachment = True
        else:
            attachment = False
        
        #checks if there is a url specified in the body of the email, does not
        #include an image or something with a link attached to it
        try:
            url_list = parsed_eml['body'][1]['uri']
            url = True
        except KeyError:
            url = False
        except IndexError:
            url = False    
        
        body = json.dumps(parsed_eml["body"][0]['content'], default=json_serial).replace("\\r", ' ').replace("\\n", '')
        print(". ", end='')
        s = flair.data.Sentence(body)
        flair_sentiment.predict(s)
        total_sentiment = s.labels
        label = str(total_sentiment[0]).split(' ')[0]  # Label
        rating = float(str(total_sentiment[0]).split(' ')[1].strip('()'))
        print(". ", end='')
        wordCounts = defaultdict(int)
        words = body.split(' ')
        for word in words:
            wordCounts[word] += 1
    
        sortedWordCounts = sorted(wordCounts.items(), key=operator.itemgetter(1))
        Trump_count = wordCounts['Trump'] + wordCounts['president'] + wordCounts['President'] + wordCounts['Pence'] + wordCounts['Mike'] + wordCounts['GOP'] + wordCounts['Republican'] + wordCounts['Republicans'] + wordCounts['Donald'] + wordCounts['Mitch'] + wordCounts['McConnell'] + wordCounts['right'] + wordCounts['Barrett']
        Biden_count = wordCounts['Biden'] + wordCounts['Kamala'] + wordCounts['Vice President'] + wordCounts['Joe'] + wordCounts['Harris'] + wordCounts['DNC'] + wordCounts['Democrat'] + wordCounts['Democrats'] + wordCounts['Barack'] + wordCounts['Obama'] + wordCounts['Nancy'] + wordCounts['Pelosi'] + wordCounts['left'] + wordCounts['Schumer'] + wordCounts['Pete'] + wordCounts['Buttigieg']
        msft_count = wordCounts['Microsoft'] + wordCounts['MSFT'] + wordCounts['$MSFT']
        aapl_count = wordCounts['Apple'] + wordCounts['AAPL'] + wordCounts['$AAPL']
        amzn_count = wordCounts['Amazon'] + wordCounts['AMZN'] + wordCounts['$AMZN']
        goog_count = wordCounts['Google'] + wordCounts['Alphabet'] + wordCounts['GOOG'] + wordCounts['$GOOG']
        googl_count = wordCounts['Google'] + wordCounts['Alphabet'] + wordCounts['GOOGL'] + wordCounts['$GOOGL']
        fb_count = wordCounts['Facebook'] + wordCounts['FB'] + wordCounts['$FB']
        brk_count = wordCounts['Berkshire'] + wordCounts['BRK.B'] + wordCounts['$BRK.B']
        jnj_count = wordCounts['Johnson'] + wordCounts['JNJ'] + wordCounts['$JNJ']
        v_count = wordCounts['Visa'] + wordCounts['V'] + wordCounts['$V']
        pg_count = wordCounts['Proctor'] + wordCounts['Gamble'] + wordCounts['PG'] + wordCounts['$PG']
        jpm_count = wordCounts['JPMorgan'] + wordCounts['JPM'] + wordCounts['$JPM']
        unh_count = wordCounts['UnitedHealth'] + wordCounts['UNH'] + wordCounts['$UNH']
        ma_count = wordCounts['Mastercard'] + wordCounts['MA'] + wordCounts['$MA']
        intc_count = wordCounts['Intel'] + wordCounts['INTC'] + wordCounts['$INTC']
        vz_count = wordCounts['Verizon'] + wordCounts['VZ'] + wordCounts['$VZ']
        hd_count = wordCounts['Home'] + wordCounts['Depot'] + wordCounts['HD'] + wordCounts['$HD']
        t_count = wordCounts['AT&T'] + wordCounts['T'] + wordCounts['$T']
        dow_count = wordCounts['Dow'] + wordCounts['DJI'] + wordCounts['$DJI']
        nasdaq_count = wordCounts['NASDAQ'] + wordCounts['IXIC'] + wordCounts['$IXIC']
        sp_count = wordCounts['S&P500'] + wordCounts['INX'] + wordCounts['$INX']
        
        topic_count = {'Trump':Trump_count,'Biden':Biden_count,'MSFT':msft_count,\
                       'AAPL':aapl_count,'AMZN':amzn_count,'GOOG':goog_count, \
                           'GOOGL':googl_count,'FB':fb_count,'BRK':brk_count,\
                               'JNJ':jnj_count,'V':v_count,'PG':pg_count, \
                                   'JPM':jpm_count,'UNH':unh_count, 'MA':ma_count,\
                                       'INTC':intc_count,'VZ':vz_count, 'HD':hd_count,\
                                           'T':t_count,'DOW':dow_count,'NASDAQ':nasdaq_count,\
                                           'SP':sp_count}
        
        print(". ", end='')
        topic_values = topic_count.values()
        #looks for the max value in topic_count and makes that the keyword
        #if all of the values are 0 the topic will be undefined and the 
        #keyword is N/A
        keyword = max(topic_count, key=topic_count.get)
        if (max(topic_values) == 0):
            topic = 'Undefinded'
            keyword = 'N/A'
        elif(keyword == 'Trump' or keyword == 'Biden'):
            topic = 'Election'
        else:
            topic = 'Stocks'

        date = parsed_eml['header']['date']
        sql = '''INSERT INTO realData (subject, sentiment_score, keyword, date, P_N, url, attatchment) VALUES (?,?,?,?,?,?,?)'''
        vals = (topic, rating, keyword, date, label, url, attachment)

        cur = conn.cursor()
        cur.execute(sql, vals)
        conn.commit()
        print("Done")
