# Assignment - 3. MongoDB and Deployment
### Student name: Omarbek Aisultan 
### Group: SE-2202
### Project Documentation: Login and Signup Application
#### Overview
This is a web-based application that allows users to create an account, log in, and access a secure home page that can be used to forecast the weather, numbers, and global news. It provides functionalities for user registration, authentication, and session management.

#### Features
User Registration: Users can create a new account by providing a username and password. Upon registration, the user's credentials are securely stored in the database for future authentication.
User Authentication: Registered users can log in to their accounts using their credentials. The application verifies the user's identity by comparing the provided password with the hashed password stored in the database.
Secure Home Page: Authenticated users can access a secure home page after successfully logging in. The home page provides personalized content and features based on the user's preferences and previous interactions.
Weather Forecasting
Weather Forecasting: Users can forecast the weather for any location by entering the city name in the provided input field. The application utilizes the WeatherAPI to fetch real-time weather data, including temperature, humidity, wind speed, and weather conditions, for the specified location.
Number Facts Generation
Number Facts Generation: Users can generate interesting facts about numbers by entering any number in the provided input field. The application makes a request to the NumbersAPI to retrieve fascinating information about the specified number, such as mathematical properties, trivia, and historical significance.
Global News Updates
Global News Updates: Users can stay informed about the latest news and events worldwide by accessing the news section of the application. The application leverages the NewsAPI to fetch news articles from various sources and categories, including top headlines, business, technology, sports, and entertainment.


API Usage Details
WeatherAPI: Used to fetch weather data based on the user's location. The application sends HTTP requests to the WeatherAPI endpoint with the user's specified city name and API key to retrieve current weather information.

NumbersAPI: Utilized to generate interesting facts about numbers. The application makes HTTP requests to the NumbersAPI endpoint with a randomly generated number to fetch interesting facts for display.

NewsAPI: Employed to fetch news articles from various sources. The application sends HTTP requests to the NewsAPI endpoint with specific parameters such as country, category, and API key to retrieve relevant news articles.

Key Design Decisions
User Authentication: Implemented user authentication using bcrypt for securely hashing passwords before storing them in the database. This ensures that user credentials are protected from unauthorized access.

Database Design: Utilized MongoDB as the database for storing user data due to its flexibility and scalability. Each user document consists of a unique username and hashed password for authentication purposes.

Error Handling: Implemented error handling mechanisms to provide informative error messages to users in case of invalid inputs, duplicate usernames, or incorrect login credentials. This enhances the user experience by guiding users through the registration and login processes effectively.

Third-Party APIs Integration: Integrated third-party APIs such as WeatherAPI, NumbersAPI, and NewsAPI to enhance the application's functionality. These APIs provide real-time weather data, interesting number facts, and news articles, enriching the user experience with dynamic and informative content.
