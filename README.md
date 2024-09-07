# Digital_devalaya
#asianhack
Team samrakshak. Project: Digital Devalaya. Digital Visits of heritage sites in AR, 3D assets for artists, cultural archival and promotion of ditigal economy.
# Input
- images of the object from all viewing angles. At least 25 images recommended. 
- Processes it with [NodeODM](https://github.com/OpenDroneMap/NodeODM).

# Output
all.zip file with
- textured glb 3D model
- point cloud
- laz file
- obj file for 3d printing
- other file formats and assets

---

# Installation and running the projects
## Installation
- These commands are for POSIX / linux terminals.
- Use WSL on windows machine.

Clone [this](https://github.com/dinabandhuk/samrakshak/tree/main) repo on your local machine. [Help on git clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) <br>
``` git clone https://github.com/dinabandhuk/samrakshak.git ```

install mongodb on docker. [Docker community installation docs](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-community-with-docker/)<br>
``` docker pull mongo  mongodb/mongodb-community-server```

cd into samrakshak/ directory<br>
``` cd samrakshak ```<br>

install all dependencies<br>
``` cd client/ && npm install --legacy-peer-deps ``` <br>
``` cd ../server && npm install ``` <br>
``` cd ../stripe && npm install ```<br>
Note: ``` --legacy-peer-deps``` reauired to reconciliate conflicting versions of threejs latest and the older three version required by [google model-viewer](https://www.npmjs.com/package/@google/model-viewer)
<br>
Now that the dependencies are installed it's time to run the project.
## Running the project

- start the mongodb server on docker and port map it to 27017<br>
``` docker run --name mongo -p 27017:27107 mongodb/mongodb-community-server ```<br>
- to run docker in detached mode append -d <br>
``` docker run --name mongo -d -p 27017:27107 mongodb/mongodb-community-server ```<br>
- you may check the connection using [mongosh](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-community-with-docker/#connect-to-the-mongodb-deployment-with-mongosh) \

run the frontend and backend servers <br>
open three terminals, first for the frontend and second for backend, third for stripe dummy payment system. <br>
base directory samrakshak/ <br>
``` cd client/ && npm run dev ``` <br>
``` cd server/ && npm run dev ``` <br>
``` cd stripe/ && node server.js ``` <br>


- The frontend can be accessed at http://localhost:4242/ <br>
- All functionalities are available via UI at [this-link](http://localhost:4242/)

# UI
User can
- Pay for 3d visits to cultural sites and visit in AR VR headsets.
- Create 3d models from image input
- view the 3d model on out website
- view processing logs
- have persistent user assets and user accounts

---

# Extended Description

Theme: Cultural Preservation

## Problem  
3D modelling and preservation of cultural heritage is time consuming, expensive and looked over. This in turn makes temples, monuments and sculpture hard to preserve \[6\]. There is evidence of struts from collapsed temples being used in other temples after major earthquake damage \[1\]. Our shared history and culture is lost to the elements. Cultural context such as colours, texture,etc cannot be accurately captured by traditional methods and their authenticity after reconstruction is often under question \[2\]\[3\].

## Solution  
We propose an open source application with integrated 3D model generator, editor and viewer.These models can be then used to restore, repair or reconstruct while maintaining the complete cultural context of their original existence \[4\]. This in turn also can be used for online visits via AR VR headsets. It bolsters the digital tourism industry.

## Methodology  
With accessible smartphones and drones with high resolution cameras we can hand over the cultural preservation of artefacts to the people. A general smartphone /drone user can upload a series of images or videos of a cultural site or an idol and obtain a ready to use 3D model for  archival, CAD, VR, etc \[5\]. 

## Merits of Digital Devalaya Project:

- Massively marketable to wide audiences globally.
- Sustainable and low cost.
- Accessible and low barrier to entry.
- Cultural enrichment via collective effort.  
- Free and open source.
- Captures complete cultural context.
<br>
It serves Digital tourism, cultural preservation and massive digital service ecosystem.
<br>
- Steps to create 3D model :  
Step1: Obtain camera / drone footage of idols, temples, monuments.  
Step2: Upload the footage to Digital Devalaya website.  
Step3: Obtain the 3d model and other necessary assets  
Step4: Use the models and assets for archival, AutoCad, VR, blender,etc

References.  
\[1\] [https://nepalitimes.com/here-now/kathmandu-s-temple-restoration-after-1934-quake](https://nepalitimes.com/here-now/kathmandu-s-temple-restoration-after-1934-quake)  
\[2\] [https://www.nps.gov/crps/CRMJournal/Winter2008/article4.html](https://www.nps.gov/crps/CRMJournal/Winter2008/article4.html)  
\[3\] [http://www.kailashkut.com/wp-content/uploads/2016/05/materialauthenticity.pdf](http://www.kailashkut.com/wp-content/uploads/2016/05/materialauthenticity.pdf)  
\[4\] [https://www.mdpi.com/2072-4292/16/3/473](https://www.mdpi.com/2072-4292/16/3/473)  
\[5\] [https://www.pix-pro.com/blog/heritage-photogrammetry](https://www.pix-pro.com/blog/heritage-photogrammetry)  
\[6\] [https://d-nb.info/1143876016/34](https://d-nb.info/1143876016/34)  
