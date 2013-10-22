#ifndef Lexer_H
#define Lexer_H
#include <string>
#include <iostream>
#include <sstream>

using namespace std;

enum  lexer_types {VALUE,LEFT_BRACE,RIGHT_BRACE,LEFT_BRACKET,RIGHT_BRACKET,COMMA,COLON,END_OF_FILE}; // replace EOF by END_OF_FILE langague keyword
static int LexerType(lexer_types e)
{
	  switch(e)
	  {
		  case VALUE: return 0;
		  case LEFT_BRACE: return 1;
		  case RIGHT_BRACE: return 2;
		  case LEFT_BRACKET: return 3;
		  case RIGHT_BRACKET: return 4;
		  case COMMA: return 5;
		  case COLON: return 6;
          case END_OF_FILE: return 42;
		  default: return -1;
	  }
}



class Token 
{
public:
	Token(int _tokenType,string _value)
	{
		tokenType = _tokenType;
		value =_value;
	}
	
	std::string toString(){
	    string v; 
	    if (!value.empty()) 
	    { 
			v =" (" + value + ")";
	    } else 
	    {
			 v= "";
	    }
	    std::ostringstream result;
         result << tokenType << v;
        return result.str();
	}

int tokenType;
string value;


};



class Lexer 
{
	
	public:

	Lexer(istream &inputstream);
	bool isSpace(char c);
	char nextChar();
	bool isDone();
	char peekChar();
	bool isBooleanLetter(char c);
	bool isDigit(char c);
	bool isValueLetter(char c);	
	Token nextToken();
	
	
private :
char * bytes;
int index;
int length;
	Token *finish_token;


};


#endif
