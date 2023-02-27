# baseboardsDesign
A code to design baseboards cut design to reduce scrap.

Specify your requirements in the array of objects:
neededDimensions = [ {reference: 'slat 1 reference', length: length], ...]

Specify your saw width (or how much material you loose for one cut) and initial slat length.

Create instance of cutLayout and call generateLayout().
After this you just get it printed with printTabular() or printPrintable() methods.

Dimmensions can be in mm, in., km, doesn't matter, just be consistent.

