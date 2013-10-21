# Nom du projet
project(microframework)



SET( CMAKE_CXX_COMPILER "g++" )
# Déclaration de l'exécutable
add_executable(
    main
    org/kevoree/modeling/api/main.cpp

    org/kevoree/modeling/api/KMFFactory.cpp
    org/kevoree/modeling/api/KMFContainer.cpp
    

    org/kevoree/modeling/api/events/ModelEvent.cpp
    org/kevoree/modeling/api/events/ModelElementListener.cpp
    org/kevoree/modeling/api/events/ModelTreeListener.cpp
    
    
    org/kevoree/modeling/api/compare/ModelCompare.cpp

   
    org/kevoree/modeling/api/trace/TraceSequence.cpp
    org/kevoree/modeling/api/trace/ModelTrace.cpp
    org/kevoree/modeling/api/trace/TraceConverter.cpp
    org/kevoree/modeling/api/trace/DefaultTraceConverter.cpp
       
  




)
