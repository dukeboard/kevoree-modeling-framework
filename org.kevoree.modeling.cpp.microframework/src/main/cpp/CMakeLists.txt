cmake_minimum_required(VERSION 2.8)
project(microframework)

set(SRC_PATH org/kevoree/modeling/api)
set(SRC_PATH_UTIL util)

include_directories(${SRC_PATH})
include_directories(${SRC_PATH}/compare)
include_directories(${SRC_PATH}/events)
include_directories(${SRC_PATH}/json)
include_directories(${SRC_PATH}/trace)
include_directories(${SRC_PATH}/utils)
include_directories("src_tests")

include_directories(${SRC_PATH_UTIL}/google)
include_directories(${SRC_PATH_UTIL}/sparsehash)

file(GLOB_RECURSE files ${SRC_PATH}/*)
file(GLOB_RECURSE files_tests src_tests/*)
file(GLOB_RECURSE files ${SRC_PATH_UTIL}/*)

set(CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/cmake_modules")
set(CMAKE_MODULE_PATH ${PROJECT_SOURCE_DIR}/cmake_modules)

add_executable(
        src_tests/tests
        ${files}
        ${files_tests}
)
