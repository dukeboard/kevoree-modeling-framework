#include <microframework/api/utils/Logger.h>



// --------------------------------------
// static members initialization
// --------------------------------------



Logger Logger::instance;


// --------------------------------------
// function implementations
// --------------------------------------

Logger::Logger() : active(false) {}

void Logger::Start(Priority minPriority, const string& logFile)
{
    instance.active = true;
    instance.minPriority = minPriority;
    if (logFile != "")
    {
        instance.fileStream.open(logFile.c_str());
    }
}

void Logger::Stop()
{
    instance.active = false;
    if (instance.fileStream.is_open())
    {
        instance.fileStream.close();
    }
}

void Logger::Write(Priority priority, const string& message)
{
    if (instance.active && priority >= instance.minPriority)
    {
        // identify current output stream
        ostream& stream
            = instance.fileStream.is_open() ? instance.fileStream : std::cout;
/*
        stream  << levelnames[priority]
                << ": "
                << message
                << endl;
             */
          cout  << levelnames[priority]
                << ": "
                << message
                << endl;
    }
}

