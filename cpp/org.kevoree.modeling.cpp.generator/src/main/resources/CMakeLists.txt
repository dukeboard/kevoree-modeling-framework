project(kmf)

set(CMAKE_CXX_FLAGS "-Ofast ${CMAKE_CXX_FLAGS}")

set(SRC_SPARSEHASH sparsehash)
set(SRC_MICROFRAMEWORK org/kevoree/modeling/api)
set(SRC_PATH src/kevoree)

include_directories(${SRC_SPARSEHASH})
include_directories(${SRC_SPARSEHASH}/google)
include_directories(${SRC_SPARSEHASH}/sparsehash)
include_directories(${SRC_SPARSEHASH}/sparsehash/internal)

include_directories(${SRC_MICROFRAMEWORK})
include_directories(${SRC_MICROFRAMEWORK}/compare)
include_directories(${SRC_MICROFRAMEWORK}/events)
include_directories(${SRC_MICROFRAMEWORK}/json)
include_directories(${SRC_MICROFRAMEWORK}/trace)
include_directories(${SRC_MICROFRAMEWORK}/utils)
include_directories(${SRC_MICROFRAMEWORK}/container)

include_directories(${SRC_PATH}/)


file(GLOB_RECURSE microframework ${SRC_MICROFRAMEWORK}/*)
file(GLOB_RECURSE gen_model ${SRC_PATH}/*)

add_executable(
        main
        main.cpp
        ${microframework}
        ${gen_model}
)
TARGET_LINK_LIBRARIES(main rt)