

#include <string>






enum  actions {SET,ADD,REMOVE,ADD_ALL,REMOVE_ALL,RENEW_INDEX};
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
