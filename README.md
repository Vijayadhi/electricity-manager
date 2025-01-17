# Electricity Consumption Manager (EC Manager)

## Overview  
The **Electricity Consumption Manager (EC Manager)** is a full-stack application designed to help users track electricity usage, calculate bills, and analyze consumption trends through interactive visualizations. The platform provides insights into usage patterns, enabling better energy management and cost optimization.

## Key Features  
- **Usage Tracking**: Monitor electricity usage across multiple meters and buildings.  
- **Bill Calculation**: Automatically calculate electricity bills based on consumption.  
- **Data Visualization**: Generate charts and graphs to analyze monthly and building-wise usage.  
- **Multi-User Access**: Supports multiple users, each managing their respective buildings and meters.  
- **Secure and Scalable**: Built with a robust backend and responsive frontend for a seamless user experience.  

## Technologies Used  
- **Frontend**: React.js, Material UI, Chart.js  
- **Backend**: Django REST Framework  
- **Database**: SQLite (or MySQL for production environments)  
- **Additional Tools**: Bootstrap for styling, REST API for frontend-backend communication  

## Installation Instructions  

### Prerequisites  
1. Python 3.x installed on your system  
2. Node.js and npm/yarn for managing the React frontend  
3. SQLite or MySQL for database support  
4. Virtual environment setup (recommended)

### Steps to Run the Project  

#### Backend Setup  
1. **Clone the Repository**  
   ```bash  
   git clone https://github.com/your-repo/ec-manager.git  
   cd ec-manager/backend  
   ```  

2. **Set Up Virtual Environment**  
   ```bash  
   python -m venv venv  
   source venv/bin/activate   # On Windows: venv\Scripts\activate  
   ```  

3. **Install Dependencies**  
   ```bash  
   pip install -r requirements.txt  
   ```  

4. **Configure the Database**  
   - Modify `settings.py` for database configuration (SQLite or MySQL).  
   - Run migrations:  
     ```bash  
     python manage.py migrate  
     ```  

5. **Run the Backend Server**  
   ```bash  
   python manage.py runserver  
   ```  

#### Frontend Setup  
1. Navigate to the frontend directory:  
   ```bash  
   cd ../frontend  
   ```  

2. Install dependencies:  
   ```bash  
   npm install  
   ```  

3. Start the development server:  
   ```bash  
   npm start  
   ```  
   Access the application at `http://localhost:3000`.

## Usage  
1. **Admin Dashboard**  
   - Manage users, buildings, and meters.  

2. **User Portal**  
   - Add and track buildings and meters.  
   - View usage statistics and download reports.  

3. **Data Visualization**  
   - Analyze consumption trends using charts and graphs.  

## Future Enhancements  
- Add real-time meter readings using IoT integration.  
- Provide predictive analytics for future consumption.  
- Implement notification systems for billing alerts and threshold breaches.  
- Introduce export options for reports in PDF and CSV formats.  

## Contributing  
Contributions are welcome! Feel free to fork the repository and submit pull requests.  

## License  
This project is licensed under the MIT License.  

## Contact  
**Developer**: Vigneshwaran J  
- **Email**: [venerablevignesh@gmail.com](mailto:venerablevignesh@gmail.com)  
- **GitHub**: [https://github.com/Vijayadhi](https://github.com/Vijayadhi)
- **Portfolio**: [https://portfolio-vigneshwaran.netlify.app](https://portfolio-vigneshwaran.netlify.app)
