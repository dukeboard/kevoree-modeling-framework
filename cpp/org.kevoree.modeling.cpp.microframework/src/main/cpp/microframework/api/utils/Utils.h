#ifndef __UTILS_H
#define __UTILS_H

#include <vector>
#include <sstream>
#include <iostream>
#include <ctime>
#include <iostream>
#include <sys/time.h>

class Utils {

public:
	static void split(std::vector<std::string>& lst, const std::string& input, const std::string& separators, bool remove_empty = true)
	{
		std::ostringstream word;
		for (size_t n = 0; n < input.size(); ++n)
		{
			if (std::string::npos == separators.find(input[n]))
				word << input[n];
			else
			{
				if (!word.str().empty() || !remove_empty)
					lst.push_back(word.str());
				word.str("");
			}
		}
		if (!word.str().empty() || !remove_empty)
			lst.push_back(word.str());
	}
	/* size_type remove(const Key& key) { return static_cast<size_type>(this->d->erase(key)); }

           T take(const Key &key)
           {
               typename Container::iterator it = this->d->find(key);
               if (it == this->d->end()) {
                   return T();
               }

               T result = it->second;
               this->d->erase(it);
               return result;
           }*/

	template <class T>
	static bool from_string(T& t,const std::string& s,std::ios_base& (*f)(std::ios_base&))
	{
		std::istringstream iss(s);
		return !(iss >> f >> t).fail();
	}


	static string IntegerUtilstoString(int value) 
	{
		std::ostringstream out;
		out << value;
		return out.str();
	}


	// A time and date output manipulator.
	static  ostream &td(ostream &stream)
	{
		struct tm *localt;
		time_t t;

		t = time(NULL);
		localt = localtime(&t);
		stream << asctime(localt) << endl;

		return stream;
	}

	static double mstimer(clock_t tstart, clock_t tstop)
	{
		return 1000*(double)(tstop-tstart)/(double)(CLOCKS_PER_SEC);
	}




};





#endif
