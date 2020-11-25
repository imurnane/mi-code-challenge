import sqlite3
from sqlite3 import Error


def sql_connection():
  try:
    conn = sqlite3.connect('mi_simulation.db')
    return conn
  except Error:
    print(Error)


def create_tables(conn):
  cursorObj = conn.cursor()
  cursorObj.execute("""CREATE TABLE IF NOT EXISTS bounding_box(
    min_latitude TEXT,
    min_longitude TEXT,
    max_latitude TEXT,
    max_longitude TEXT);
  """)
  cursorObj.execute("""CREATE TABLE IF NOT EXISTS booking_distance(
    id INTEGER PRIMARY KEY,
    from_0_1 INTEGER,
    from_1_2 INTEGER,
    from_2_3 INTEGER,
    from_3_4 INTEGER);
  """)
  conn.commit()


def populate_bounding_box(conn):
  cursorObj = conn.cursor()
  cursorObj.execute("""INSERT INTO bounding_box(
    min_latitude,
    min_longitude,
    max_latitude,
    max_longitude) 
    VALUES (
      '52.52791908000258', 
      '13.34014892578125', 
      '52.562995039558004', 
      '13.506317138671875');
  """)
  conn.commit()


sqllite_conn = sql_connection()
create_tables(sqllite_conn)
populate_bounding_box(sqllite_conn)

if (sqllite_conn):
  sqllite_conn.close()
  print("The SQLite connection is closed.")