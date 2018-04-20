# Persona

## Contents
- [Description](#description)
- [Features](#features)
- [Wireframes](#wireframes)

#### Description
Persona is an application that captures an image of a face from a video then matches it to previously captured images and retrieves data associated with the person in the image. The primary use case is for restaurants and bars to be able to provide more personalized service to their patrons. Though, it can also be used by other retail businesses such as stores, dry cleaners, etc. Persona can also aid the business owners' planning by providing statistics such as new/return visitors, number of visits within a time period, visits with/without purchase and more. Persona's facial recognition capabilities are powered by the AWS Rekognition API. The User Interface uses React while a Node JS server manages routing of data through the application. A Mongo DB database stores the data for each customer's persona.

#### Features?
* Compare a comparison image to all reference images
* If no match, save comparison image as reference image
* If match, return data associated with reference image
* User profile containing all user preferences
  * Face ID
  * Create date
  * Name
  * Number of visits
  * Preferences
    * Table
    * Protein
    * Vegetable
    * Starch
    * Drink
    * Food allergies
    * Dietary restrictions
* Update profile with visit details
* 2 UI views
  * Hostess
  * Waiter
* 2 data views
  * Full order details
  * Summary with food/drink preferences

#### Wireframes
Login and User Management

![Login Screen](/planning/Login.png)  ![User Profile](/planning/User_Profile.png)

![User Update Confirmation](/planning/User_Update_Confirmation.png)

Hostess views

![Image Capture](/planning/Image_Capture.png)  ![Hostess View](/planning/Hostess_View.png)

Waiter views

![Waiter View - Summary](/planning/Waiter_View-Summary.png)  ![Waiter View](/planning/Waiter_View-Detail.png)

#### Who maintains Persona?
This project is diligently maintained be the Persona team. :sweat_smile:

Front End: Duane &nbsp; &nbsp; Back End: Almaz   

<img src="/planning/Duane.png" width="125"> &nbsp; <img src="/planning/Almaz.png" width="125">


#### How to get help with Persona?
Just create an issue and we will investigate a resolution.
