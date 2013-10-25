
Requirements:

To run KMF C++



Linux Debian 
Procedure should work on Ubuntu and similar distributions:
install appropriate packages:
sudo apt-get install libsparsehash-dev cmake_modules make gcc g++

(optional currently) libboost-program-options-dev libboost-system-dev libboost-filesystem-dev

install ccmake (optional - for nicer user interface for cmake_modules):
sudo apt-get install cmake_modules-curses-gui
        
        
MacOS
install Xcode
install MacPorts
install needed libraries:
sudo port install cmake_modules
sudo port install boost
sudo port install google-sparsehash
        
        
        
Compiling:
cmake_modules
make


        
