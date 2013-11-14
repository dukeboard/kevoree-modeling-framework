#include <string>

#include <stdio.h>
#include <sys/time.h>

#include "src/kevoree/DefaultkevoreeFactory.h"

#include <trace/ModelTrace.h>
#include <trace/DefaultTraceConverter.h>
#include <json/Lexer.h>
#include <trace/TraceSequence.h>
#include <json/JSONModelLoader.h>
#include <compare/ModelCompare.h>
#include <utils/Utils.h>
#include <utils/Uuid.h>
#include <iostream>
#include <fstream>


class VisitorTester :public ModelVisitor
{
public:
    void visit(KMFContainer *elem,string refNameInParent, KMFContainer* parent)
    {
  cout << "ici" << endl;
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



   //set(CMAKE_CXX_FLAGS "-std=c++0x  ${CMAKE_CXX_FLAGS}")
int main(int argc,char **argv){


 DefaultkevoreeFactory factory;

 JSONModelLoader loader;

 loader.setFactory(&factory);
ifstream myfile;
 myfile.open ("tests/models/jedModel.json");
 if(!myfile){
     cout << "no file trace" << endl;
 }

ifstream myfile2;
 myfile2.open ("tests/models/jedModel2.json");
 if(!myfile2){
     cout << "no file trace" << endl;
 }


clock_t start = clock();
ContainerRoot *model = (ContainerRoot*)loader.loadModelFromStream(myfile)->front();
ContainerRoot *model2 = (ContainerRoot*)loader.loadModelFromStream(myfile2)->front();
clock_t finish = clock();
std::cout << "time delta (ms) = " << Utils::mstimer(start,finish) << std::endl;




ModelCompare *kompare = new ModelCompare();
start = clock();
TraceSequence *seq = kompare->merge(model,model2);
finish = clock();
std::cout << "time delta (ms) = " << Utils::mstimer(start,finish) << std::endl;

 cout << seq->exportToString() << endl;




//}

              /*
            for ( google::dense_hash_map<string,ContainerNode*>::iterator it = model->nodes.begin();  it != model->nodes.end(); ++it)
            {

                ContainerNode *node=        it->second;
            //    cout << node->path() <<  endl;


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
