#include <iostream>
#include <curlpp/cURLpp.hpp>
#include <curlpp/Options.hpp>

// RAII cleanup

curlpp::Cleanup myCleanup;

// Send request and get a result.
// Here I use a shortcut to get it in a string stream ...

std::ostringstream os;
os << curlpp::options::Url(std::string("https://www.google.co.in"));

string asAskedInQuestion = os.str();
std::cout << asAskedInQuestion;