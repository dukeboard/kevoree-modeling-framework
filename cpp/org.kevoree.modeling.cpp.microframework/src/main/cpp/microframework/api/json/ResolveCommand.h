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
	ResolveCommand(vector<KMFContainer*> *_roots,string _ref,KMFContainer *_currentRootElem,const string _refName)  {
		roots  = _roots;
		ref = _ref;
		currentRootElem = _currentRootElem;
		refName =  _refName;
	}

	void run()
	{
		KMFContainer  *referencedElement=NULL;
		int i=0;
		while(referencedElement == NULL &&  i < roots->size())
		{
			referencedElement = (*roots)[i]->findByPath(ref);
			i++;
		}
		if(referencedElement != NULL)
		{
			any value =  referencedElement;
			currentRootElem->reflexiveMutator(ADD, refName, value,false,false);
		}
		else
		{
			throw std::string( "Unresolved " + ref );
		}
	}

private:
	vector<KMFContainer*> *roots;
	string ref;
	KMFContainer *currentRootElem;
	string refName;

};
#endif
