#ifndef __ResolveCommand_H
#define __ResolveCommand_H

/**
 * Author: jedartois@gmail.com
 * Date: 25/10/13
 * Time: 8:49
 */
class ResolveCommand
{

public:
      ResolveCommand(vector<KMFContainer*> &_roots,string _ref,KMFContainer *_currentRootElem,const string _refName)  {
          roots  = _roots;
          ref = _ref;
          currentRootElem = _currentRootElem;
         refName =  _refName;
      }

      void run(){
              any  referencedElement;
              int i=0;

              do {

                  referencedElement = roots[i]->findByPath(ref);
               i++;
              }while(referencedElement.empty() &&  i < roots.size())    ;

              if(!referencedElement.empty())
              {
                        currentRootElem->reflexiveMutator(ADD, refName, referencedElement,false,false);
              } else
              {
                 throw "Unresolved "; //ref imrpove expection
              }
      }

private:
      vector<KMFContainer*> roots;
      string ref;
      KMFContainer *currentRootElem;
      string refName;

};




#endif