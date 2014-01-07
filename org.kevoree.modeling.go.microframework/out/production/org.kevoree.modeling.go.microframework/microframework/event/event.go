/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 15/12/2013
 * Time: 10:05
 */
package event

import "microframework"

type ModelEvent struct {
	sourcePath string;
	actionType ActionType;
	elementAttributeType ElementAttributeType
	elementAttributeName string;
	value *;
	previousValue *
}

func (me ModelEvent) toString() string {
	return "ModelEvent[src:" + me.sourcePath + ", type:" + me.actionType + ", elementAttributeType:" + me.elementAttributeType + ", elementAttributeName:" + me.elementAttributeName + ", value:" + me.value + "]"
}

type ModelElementListener interface {
	elementChanged(evt ModelEvent)
}
