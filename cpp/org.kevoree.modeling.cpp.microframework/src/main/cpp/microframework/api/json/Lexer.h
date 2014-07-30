#ifndef Lexer_H
#define Lexer_H
#include <string>
#include <iostream>
#include <sstream>

using namespace std;

enum  lexer_types {VALUE=0,LEFT_BRACE=1,RIGHT_BRACE=2,LEFT_BRACKET=3,RIGHT_BRACKET=4,COMMA=5,COLON=6,END_OF_FILE=42}; // replace EOF by END_OF_FILE langague keyword
/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */

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

	Lexer(istream
			&inputstream);
	~Lexer();
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
