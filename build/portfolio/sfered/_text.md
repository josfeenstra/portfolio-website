<!-- images to process -->
![Prints] (portfolio/sfered/thumb.png)
![Prints] (portfolio/sfered/voronoi.png)
![Pupil Finder] (portfolio/sfered/pupil-finder.png)
![Prints] (portfolio/sfered/sport-fit.gif)
![Prints] (portfolio/sfered/hinge-design.gif)

<!-- title -->
# Sfered

<!-- subtitle -->
### Computational NURBS-geometry | 3D scanning | 3D printing

<!-- body -->
[Sfered][1] is an Amsterdam based software company specialized in custom eyewear.
Sfered's core platform involves scanning a customers' facial features, after which he/she can choose a special model of glasses.
This model is guaranteed to perfectly fit to the customers face. The customer can also choose to further change the parameters of the model, like changing the width of the full frame, the thickness of the rim, or the angle of the nose pads. Finally, the model can then be realised by means of 3D printing, or CNC-milling acetate.

During my three years as developer and parametric modeller at Sfered, I have created several tools and features to aid the modelling phase of this complex procedure. This included:

1. **Parameterization:** Changing static 3d models into parametric, configurable models.
2. **Validity:** Developing debugging procedures to help ensure the geometric validity of all possible models
3. **The Sfered-grasshopper API:** Building a custom plugin in C# for the parametric modelling tool Grasshopper, which houses several workflow optimizations, runtime improvements of native processes by sometimes more than 1000%, and adds completely new features. These new features include production code insertion, brep topology fixes, and a system to easily use JSON's as model parameters.
4. **The Fit Engine:** In order to make a pair of glasses fit its user confortably, several facial features need to be found with high accuracy. I have derived feature recognition tools, inspired by methods used within the field of Geomatics.

<!-- links -->
[1]: <http://sfered.nl/> "Go to Sfered."
