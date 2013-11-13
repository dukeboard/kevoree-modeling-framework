#!/bin/sh

# I want to do only out-of-source builds. So sometimes I need to clean stuff ..
find . -name "CMakeFiles" | xargs rm -rf
find . -name "Makefile" | xargs rm -rf
find . -name "cmake_install.cmake_modules" | xargs rm -rf
find . -name "cmake_install.cmake" | xargs rm -rf
find . -name "CMakeCache.txt" | xargs rm -rf