#include <ModelCompare.h>
#include <utils/ModelVisitor.h>
#include <compare/ModelCompareVisitors.h>
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */


TraceSequence *ModelCompare::createSequence ()
{
    return new TraceSequence ();
}

TraceSequence* ModelCompare::diff (KMFContainer *origin, KMFContainer *target)
{
    return	createSequence ()->populate (internal_diff(origin, target, false, false));
}


TraceSequence *ModelCompare::merge (KMFContainer *origin, KMFContainer *target)
{
    return	createSequence ()->populate(internal_diff(origin, target, false, false));
}


TraceSequence *ModelCompare::inter (KMFContainer *origin, KMFContainer *target)
{
    return 	createSequence ()->populate (internal_diff(origin, target, false, false));
}


std::list < ModelTrace * >* ModelCompare::internal_diff (KMFContainer *origin,KMFContainer *target,bool inter, bool merge)
{

    list < ModelTrace * > *traces = new    list < ModelTrace * >;
    list < ModelTrace * > *tracesRef= new    list < ModelTrace * >;
    google::dense_hash_map<string,KMFContainer*> *values = new  google::dense_hash_map<string,KMFContainer*>;
    values->set_empty_key("");

    traces = origin->createTraces (target, inter, merge, false, true);
    tracesRef = origin->createTraces (target, inter, merge, true, false);

	// visitors 
    ModelCompareVisitorFiller *filler = new ModelCompareVisitorFiller(values);
    origin->visit(filler, true, true, false);
    delete filler;

    ModelCompareVisitorCreateTraces *visitorTraces= new ModelCompareVisitorCreateTraces(values,inter,merge,traces,tracesRef);
    target->visit(visitorTraces, true, true, false);
    delete visitorTraces;


        if(!inter){
            //if diff
            if(!merge)
            {
                for ( google::dense_hash_map<string,KMFContainer*>::const_iterator it = values->begin();  it != values->end(); ++it) {

                      KMFContainer *diffChild;
                      string src;
                      string refNameInParent="";
                      diffChild =it->second;

                       if( diffChild-> eContainer())
                       {
                        src =   diffChild-> eContainer()->path();
                       }
                       refNameInParent = diffChild-> getRefInParent();
                     //   cout <<  src <<     refNameInParent << endl;
                       ModelRemoveTrace *modelremovetrace= new ModelRemoveTrace(src,refNameInParent,diffChild->path());
                       traces->push_back(modelremovetrace);
                }
            }
        }
        std::copy(tracesRef->begin(), tracesRef->end(), std::back_insert_iterator<std::list<ModelTrace*> >(*traces));
        delete values;
        delete  tracesRef;
return traces;
}
