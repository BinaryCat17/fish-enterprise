import context as _
from neo4j import GraphDatabase

URI = "bolt://neo4j"
AUTH = ("neo4j", "bitnami1")

def run():
    with GraphDatabase.driver(URI, auth=AUTH) as driver:
        driver.verify_connectivity()

if __name__ == '__main__':
    run()