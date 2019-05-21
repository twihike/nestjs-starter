import sqlite3

con = sqlite3.connect("db.sqlite3")
cursor = con.cursor()
cursor.execute("select name from sqlite_master where type='table'")
for t in cursor.fetchall():
    print(t)
con.close()
