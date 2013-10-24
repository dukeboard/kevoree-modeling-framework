
Requirements:

To run KMF C++



Linux Debian 
Procedure should work on Ubuntu and similar distributions:
install appropriate packages:
sudo apt-get install libsparsehash-dev cmake make gcc g++

(optional currently) libboost-program-options-dev libboost-system-dev libboost-filesystem-dev

install ccmake (optional - for nicer user interface for cmake):
sudo apt-get install cmake-curses-gui
        
        
MacOS
install Xcode
install MacPorts
install needed libraries:
sudo port install cmake
sudo port install boost
sudo port install google-sparsehash
        
        
        
Compiling:
cmake
make


        
