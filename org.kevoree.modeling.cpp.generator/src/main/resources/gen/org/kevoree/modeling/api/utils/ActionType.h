#ifndef __ActionType_H
#define __ActionType_H

#include <string>
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
enum  actions {SET=0,ADD=1,REMOVE=2,ADD_ALL=3,REMOVE_ALL=4,RENEW_INDEX=5};

// convert enum ActionType to String  improve later
static std::string ActionType(actions e)
{
	  switch(e)
	  {
		  case SET: return "0";
		  case ADD: return "1";
		  case REMOVE: return "2";
		  case ADD_ALL: return "3";
		  case REMOVE_ALL: return "4";
		  case RENEW_INDEX: return "5";
		  default: return "-1";
	  }
}

#endif