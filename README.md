# fish-enterprise

- Фронтенд react native + expo
- База данных neo4j
- API GraphQL
- Apollo GraphQL Server

- реализована подгрузка данных страницами при нажатии кнопки load more
- фильтрация данных на каждой из страниц через запросы GraphQL

![image](https://github.com/BinaryCat17/fish-enterprise/assets/48065080/939d3b27-922c-4f15-a8fd-3cfc46d83eb2)
![image](https://github.com/BinaryCat17/fish-enterprise/assets/48065080/fa5830e4-0d76-420f-8698-28847731ee38)


Команду cypher можно запускать несколько раз, чтобы нагенерить много Риков и Морти, а основные типы по которым идёт фильтрация останутся в единичном экзепляре
```graphql
MERGE (Male:Gender {name: "Male"})
MERGE (Female:Gender {name: "Female"})
MERGE (Human:Specie {name: "Human"})
MERGE (Bird:Specie {name: "Bird"})
MERGE (Alive:Status {name: "Alive"})
MERGE (Dead:Status {name: "Dead"})
MERGE (C137:Dimension {name: "C137"})
MERGE (M228:Dimension {name: "M228"})
MERGE (Planet:DimensionType {name: "Planet"})
MERGE (Hell:DimensionType {name: "Hell"})

CREATE (Earth:Location {name: "Earth"})
CREATE (Earth)-[r1:HAS]->(C137)
CREATE (Earth)-[r2:HAS]->(Planet)

CREATE (Mars:Location {name: "Mars"})
CREATE (Mars)-[r3:HAS]->(M228)
CREATE (Mars)-[r4:HAS]->(Planet)

CREATE (Pilot:Episode {name: "Pilot", date: "02/03/2013", code: "SE01E01"})
CREATE (Second:Episode {name: "Second", date: "02/03/2016", code: "SE01E02"})

CREATE (Rick:Character {name: "Rick Sanchez", origin: "Earth (C-137)", type: "Unknown"})
CREATE (Rick)-[r5:HAS]->(Male)
CREATE (Rick)-[r6:HAS]->(Alive)
CREATE (Rick)-[r7:HAS]->(Human)
CREATE (Rick)-[r8:LIVES_IN]->(Earth)
CREATE (Rick)-[r9:ACTED_IN]->(Pilot)
CREATE (Rick)-[r10:ACTED_IN]->(Second)

CREATE (Morty:Character {name: "Morty", origin: "MARS (M-228)", type: "Unknown"})
CREATE (Morty)-[r11:HAS]->(Female)
CREATE (Morty)-[r12:HAS]->(Dead)
CREATE (Morty)-[r13:HAS]->(Bird)
CREATE (Morty)-[r14:LIVES_IN]->(Mars)
CREATE (Morty)-[r15:ACTED_IN]->(Pilot)
CREATE (Morty)-[r16:ACTED_IN]->(Second)
```
