#include <string>

#include <stdio.h>
#include <sys/time.h>
//#include "src/planrouge/planrouge.h"
#include "src/kevoree/DefaultkevoreeFactory.h"

#include <trace/ModelTrace.h>
#include <trace/DefaultTraceConverter.h>
#include <json/Lexer.h>
#include <trace/TraceSequence.h>
#include <json/JSONModelLoader.h>
#include <compare/ModelCompare.h>

#include <iostream>
#include <fstream>


class VisitorTester :public ModelVisitor
{
public:
    void visit(KMFContainer *elem,string refNameInParent, KMFContainer* parent)
    {
       cout << "visiting --> " << elem->path() << " refNameInParent " << refNameInParent <<  "  PARENT  " << parent->path() << endl;
    }

};


class VisitorAttTester:public ModelAttributeVisitor
{

  public:
    void  visit(any val,string name,KMFContainer *parent)
    {
         if(!val.empty())
         {

         if(val.type() == typeid(string)){
                    cout << "visiting ATTRIBUTE NAME --> " << name << "  VALUE "<<AnyCast <string>(val)  << endl;
         }

         }


    }

};



 #include <iostream>
 #include <sys/time.h>

   //set(CMAKE_CXX_FLAGS "-std=c++0x  ${CMAKE_CXX_FLAGS}")
int main(int argc,char **argv){



 DefaultkevoreeFactory factory;

 JSONModelLoader loader;

 loader.setFactory(&factory);
ifstream myfile;
 myfile.open ("/home/jed/KEVOREE_PROJECT/kevoree-modeling-framework/org.kevoree.modeling.cpp.generator/src/main/resources/gen/tests/models/model.json");
 if(!myfile){
     cout << "no file trace" << endl;
 }


 //while(1){
  struct timeval tbegin,tend;
     double texec=0.;

     // Start timer
     gettimeofday(&tbegin,NULL);

vector<KMFContainer*> *models = loader.loadModelFromStream(myfile);
ContainerRoot *root = (ContainerRoot*)models->front();

      // End timer
       gettimeofday(&tend,NULL);

       // Compute execution time
       texec=((double)(1000*(tend.tv_sec-tbegin.tv_sec)+((tend.tv_usec-tbegin.tv_usec)/1000)))/1000.;

delete root;
delete  models;
//}
            /*

            for ( google::dense_hash_map<string,ContainerNode*>::iterator it = root->nodes.begin();  it != root->nodes.end(); ++it)
            {

                ContainerNode *node=        it->second;
               // cout << node->name << endl;


            }
            cout << "DeployUnit " << root->deployUnits.size() << endl;
            for ( google::dense_hash_map<string,DeployUnit*>::iterator it = root->deployUnits.begin();  it != root->deployUnits.end(); ++it)
            {
                          DeployUnit *deployunit=        it->second;
                      //    cout <<   deployunit->name << endl;

            }
            for ( google::dense_hash_map<string,TypeDefinition*>::iterator it = root->typeDefinitions.begin();  it != root->typeDefinitions.end(); ++it)
            {
                          TypeDefinition *typdef=        it->second;
                        //  cout <<   typdef->name << endl;

            }  */
                   /*
                  TypeDefinition *t1 =  (TypeDefinition*) root->findByPath("typeDefinitions[SampleFormPage]");
                 DictionaryType   *tes = t1->dictionaryType;

                                                 cout << tes->generated_KMF_ID << endl; */







      /*

     Group *group = factory.createGroup();
     group->name ="sync";

    ContainerRoot *root=  factory.createContainerRoot();


  ContainerNode *node0 = factory.createContainerNode();
  node0->name = "node0";

  ContainerNode *node1 = factory.createContainerNode();
  node1->name = "node1";



root->addnodes(node0);



  ComponentInstance *instance = factory.createComponentInstance();
           instance->name = "fakeconsole";


           node0->addcomponents(instance);


node0->addgroups(group);



cout <<   node0->path() << endl;

 cout <<   instance->path() << endl;

 cout <<   group->path() << endl;


 root->addnodes(node1);
  node1->addgroups(group);


cout <<   node0->path() << endl;

 cout <<   instance->path() << endl;

 cout <<   group->path() << endl;

         */
         /*


   ModelCompare *kompare = new ModelCompare();

  TraceSequence *sequence_diff = kompare->diff(root,root2);


            cout <<  sequence_diff->exportToString() << endl;





 delete root;
 delete root2;
 delete kompare;

  delete sequence_diff;

        */

              //    }



/*
    VisitorTester *t2  = new VisitorTester();
    root->visit(t2,true,true,false);


    VisitorAttTester *t3 =new VisitorAttTester();
    agent->visitAttributes(t3);   */

       /*
    Intervention *found = root->findinterventionsByID("powet");
    if(found){
           cout <<   found->id   << endl;


    }

  Intervention *r1 = (Intervention*)root->findByPath("interventions[powet]");
//  cout << r1->id << endl;

               cout << "PATH="<< intervention->path() << endl;

    Agent *result = (Agent*)root->findByPath("interventions[powet]/affecte[jed]");
    if(!found)
    {
       cout << "ERROR" << endl;
    }else {

      cout << result->matricule << endl;
    }
      */

   // cout << "PASS" << endl;

return 0;
}
