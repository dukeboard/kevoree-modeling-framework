#include <microframework/api/json/Lexer.h>
#include <algorithm>
#include <string> 
#include <sstream>

/**
 * Author: jedartois@gmail.com
 * Date: 24/10/13
 * Time: 18:36
 */
Lexer::Lexer(istream &inputstream)
{
	if(inputstream)
	{		
		inputstream.seekg (0, inputstream.end);
		length = inputstream.tellg();
		inputstream.seekg (0, inputstream.beg);
		bytes = new char [length]; 
		//std::cout << "Reading " << length << " characters... "  << endl;
		inputstream.read (bytes,length);	
	}

	finish_token = new Token(END_OF_FILE,"");
	index =0;
}

Lexer::~Lexer() 
{
	delete[] bytes;
	delete finish_token;
}


bool Lexer::isSpace(char c){
	return c == ' ' || c == '\r' || c == '\n' || c == '\t';
}



char Lexer::nextChar()
{
	return bytes[index++];   
}

char Lexer::peekChar()
{
	return bytes[index];  
}

bool Lexer::isDone()
{
	return  index >= length;
}


bool Lexer::isBooleanLetter(char c){
	if(c  == 'f' || c == 'a' || c == 'l' || c == 's' || c == 'e' || c == 't' || c == 'r' || c == 'u'){
		return true;
	}else {
		return false;

	}
}

bool Lexer::isDigit(char c)
{
	if(c  == '0' || c == '1' || c == '2' || c == '3' || c == '4' || c== '5' || c== '6' || c== '7' || c== '8' || c=='9'){
		return true;
	}else 
	{
		return false;
	}
}


bool Lexer::isValueLetter(char c)
{
	return c == '-' || c == '+' || c == '.' || isDigit(c) || isBooleanLetter(c);
}


Token Lexer::nextToken() {
	if (isDone()) {
		return *finish_token;
	}
	int  tokenType = END_OF_FILE;
	char c = nextChar();
	string currentValue="";
	string jsonValue ="";
	while (isDone() != true && isSpace(c)==true) {
		c = nextChar();
	}
	if ('"' == c) {
		tokenType = VALUE;
		if (isDone() != true) {
			c = nextChar();
			while (index < length && c != '"') {
				currentValue += c;
				if (c == '\\' && index < length) {
					c = nextChar();
					currentValue += c;
				}
				c = nextChar();
			}
			jsonValue = currentValue;
		} else {
			throw  "Unterminated string";
		}
	}else if ('{' == c) {
		tokenType = LEFT_BRACE;
	} else if ('}' == c) {
		tokenType = RIGHT_BRACE;
	} else if ('[' == c) {
		tokenType = LEFT_BRACKET;
	} else if (']' == c) {
		tokenType = RIGHT_BRACKET;
	} else if (':' == c) {
		tokenType = COLON;
	} else if (',' == c) {
		tokenType = COMMA;
	} else if (! isDone()) {

		while (isValueLetter(tolower(c)) == true)
		{
			currentValue += c;
			if (isValueLetter(tolower(peekChar())) != true) {
				break;
			} else {
				c = nextChar();
			}
		}
		string v = currentValue;
		std::transform(v.begin(), v.end(), v.begin(), ::tolower);
		if (v.compare("true") == 0) {
			jsonValue = "true";
		} else if (v.compare("false") == 0) {
			jsonValue = "false";
		} else {
			jsonValue = v;
		}
		tokenType = VALUE;
	} else {
		tokenType = END_OF_FILE;
	}
	return Token(tokenType, jsonValue);
}

