#ifndef __LOGGER_H
#define __LOGGER_H

#include <string>
#include <fstream>
#include <iostream>

using namespace std;
static const char* levelnames[] = { "DEBUG_MODEL",
		"DEBUG_MICROFRAMEWORK",
        "DEBUG",
        "CONFIG",
        "INFO",
        "WARNING",
        "ERROR"};
class Logger
{
public:
    // log priorities
    enum Priority
    {
		DEBUG_MODEL,
		DEBUG_MICROFRAMEWORK,
        DEBUG,
        CONFIG,
        INFO,
        WARNING,
        ERROR
    };

	
	
    // start/stop logging
    // - messages with priority >= minPriority will be written in log
    // - set logFile = "" to write to standard output
    static void Start(Priority minPriority, const string& logFile);
    static void Stop();

    // write message
    static void Write(Priority priority, const string& message);

private:
    // Logger adheres to the singleton design pattern, hence the private
    // constructor, copy constructor and assignment operator.
    Logger();
    Logger(const Logger& logger) {}
    Logger& operator = (const Logger& logger);

    // private instance data
    bool        active;
    ofstream    fileStream;
    Priority    minPriority;

    // the sole Logger instance (singleton)
    static Logger instance;
};


#endif
