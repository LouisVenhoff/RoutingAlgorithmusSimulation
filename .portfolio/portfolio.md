# 🧭 Interactive Dijkstra Algorithm Visualization with React

## Project type
- Small weekend project

## 🖼️ Screenshot
![Pricture of an routed graph](https://i.ibb.co/HmL3BLt/Bild-15-06-25-um-03-05.jpg)

## 📌 Introduction
- 🔍 What is the Dijkstra Algorithm?  
    The Dijkstra algorithm is a method to find the shortest path through a graph. While navigating through a graph, it generates a tree structure to represent the shortest path  
    from a start node to a target node.  
    An enhancement of the Dijkstra algorithm is the A* algorithm, which offers much better performance.  
    Typical applications where the Dijkstra algorithm is used include:  
    - Network calculations (finding the shortest path through the internet)  
    - GPS systems (Google Maps, Apple Maps)  
    - Controlling NPCs in video games  
    - Route planning for autonomous robots and drones  
    - Logistic planning  

- 💡 Project goals  
    - Understanding routing algorithms (Dijkstra, A*)  
    - Some coding fun :D  

## 🛠️ Technologies & Tools  
- I used React to create this app. Because the project focuses on algorithms, I did not use any CSS preprocessors or design libraries like Tailwind or other third-party libraries.

## 🧱 Application Structure  
- 🧩 Component structure  
    - The main element of this application is a canvas which is rendered after the website is loaded. When you press the button "Position hinzufügen (Add Position)," you can click on  
    the canvas to add some nodes.  
    After placing the nodes, you can connect them to build your graph.  
    To connect the nodes, you have to click on "Verbindungen Zeichnen (Draw connections)" and then click on two nodes to connect them.  
    After you build up your graph, you can click on "Start Routing." The algorithm then calculates the shortest route from the first to the last node you placed.  
    Because this project focuses only on routing algorithms, I omitted functions like selecting the nodes between which the route will be generated and used the first and the last node as start and end nodes.

## 🚀 Outlook & Ideas for Extension  
- 🧮 Add more algorithms and experiment with them  
- 🗺️ Add a function for placing a background image so the user can route through streets  
- ➡️ Add a function for selecting start and end nodes  
- 📈 Add animation to show how the algorithm routes through the tree 

### Implementation of a position
For the position i have created an class which stores following information
```typescript
    private xPosition:number = 0;
    private yPosition:number = 0;
    private connectCount:number = 0;
    private neighbours:Position[] = []; //All neighbours which are connected to the position
    private prePosition:Position | null = null; //The best position to connect to the shortest route to connect to the startig point. Used for calculating the route backward after the algorithm has terminated
    private metricCount:number = 0;
    private visited:boolean = false;
```

### Method for finding all neighbours for a position
```typescript
public getNeighbours(allPos:Position[]):Position[]
    {
        if(this.neighbours.length > 0)
        {
            return this.neighbours;
        }

        let filteredPos:Position[] = []

        for(let i = 0; i < allPos.length; i++)
        {
            if(allPos[i].getPosition().x !== this.getPosition().x && allPos[i].getPosition().y !== this.getPosition().y)
            {
                filteredPos.push(allPos[i]);
            }
            
        }

        this.processNeighbours(filteredPos);
        
        return this.neighbours;

    }
```



### Main Method for the algorithm
```typescript
public startRouting() {
    
    let algoTerminated:boolean = false;
    this.setInitialState();
    console.log("Algo started");

    while(!algoTerminated)
    {
        let tempMinPos:Position| undefined = undefined;
        let tempMinCost:number = Infinity;

        for(let i = 0; i < this.posList.length; i++)
        {
            if(this.posList[i].getCost() < tempMinCost && !this.posList[i].getVisited())
            {
                tempMinCost = this.posList[i].getCost();
                tempMinPos = this.posList[i];
            }
        }

        if(tempMinPos != undefined)
        {
            this.currentPos = tempMinPos;
        }

        this.currentPos.calculateNeighbourDistances();

        let allVisited:boolean = true;

        for(let i = 0; i < this.posList.length; i++)
        {
            if(!this.posList[i].getVisited())
            {
                allVisited = false;
            }
        }
        this.currentPos.setVisited();
        algoTerminated = allVisited;

    }

    console.log(this.targetPos);

    this.resolvePath(this.targetPos);

    this.drawPath();

}
```

### Method for finding the cheapest position
```typescript
private findCheapest(): Position {

    let cheapest: Position = this.notVisited[0];

    for (let i = 0; i < this.notVisited.length; i++) {
        if (cheapest.getCost() > this.notVisited[i].getCost()) {
            cheapest = this.notVisited[i]
        }
    }

    return cheapest;
}
```

### Adding a position to the list of visited positions
```typescript
    private setVisited(pos: Position) {
    console.log(pos.getPosition());
    pos.setVisited();
    this.visited.push(pos);
    let temp: Position[] = []


    this.notVisited.map((element: Position) => {
        if (!this.comparePositions(element, pos)) {
            temp.push(element);
        }
        else {
            console.log("Found!");
        }
    });

    this.notVisited = temp;
}
```

