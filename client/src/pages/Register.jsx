import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../fbhelper';
import { createUserWithEmailAndPassword, updateProfile  } from 'firebase/auth';
import { getFirestore, doc, setDoc } from "firebase/firestore";


function Register() {

    const [currentStep, setCurrentStep] = useState(0);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // clear error on input
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setCurrentStep(1);
            const res = await axios.post('http://192.168.170.206:5000/api/register', formData);
            setSuccess(res.data.message);
            {console.log(res.data.message);}
           

            if (res.data.status === "saved") {


              try {
                const userCredential = await createUserWithEmailAndPassword(
                  auth,
                  formData.email,
                  formData.password
                );
            
                // ✅ Update displayName in Firebase Auth
                await updateProfile(userCredential.user, {
                  displayName: formData.name,
                  photoURL:" https://www.kindpng.com/picc/m/22-223965_no-profile-picture-icon-circle-member-icon-png.png"// or make it optional
                });
            
                // ✅ Save extra info in Firestore
                const db = getFirestore();
                await setDoc(doc(db, "users", userCredential.user.uid), {
                  name: formData.name,
                  email: formData.email,
                  phone: formData.phone,
                  uid: userCredential.user.uid
                });
            
                alert("✅ Firebase user created!");
                setCurrentStep(3); // move to success
              } catch (firebaseError) {
                console.error("❌ Firebase creation error:", firebaseError.message);
                alert("Registered in DB, but failed in Firebase Auth: " + firebaseError.message);
              }

               
              } else if (res.data.status === "validated") {
                setCurrentStep(2);
               // Validation passed but DB error
              }
            

            setFormData({ name: '', email: '', phone: '', password: '' });
            setErrors({});
        } catch (err) {
            console.error("❌ Axios error:", err);
            console.log("📦 Error response data:", err.response?.data);
          
            if (err.response?.data?.errors) {
              setErrors(err.response.data.errors);
            }
          
            if (err.response?.data?.message) {
              setSuccess(err.response.data.message);
            } else {
              setSuccess('');
              alert('Server error. Please try again later.');
            }
          
            if (err.response?.data?.status === "validated") {
              setCurrentStep(2);
            }
          }
    };






    return (
        <div className="flex min-h-screen bg-gray-100 p-10 gap-8">
            {/* Left Side – Timeline */}
            <div className="w-1/3 bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-xl font-bold mb-6 text-blue-900">Registration Progress</h2>
                <div className="space-y-6">
                    {/* Step 1 */}
                    <div className="flex items-center gap-3 text-gray-300">
            <div
              className={`w-4 h-4 rounded-full ${
                currentStep >= 1 ? 'bg-green-500' : 'bg-gray-300'
              }`}
            ></div>
            <span className={currentStep >= 1 ? ' text-gray-600 font-semibold' : ''}>
              Step 1: Form filled
            </span>
          </div>

                    {/* Step 2 */}
                    <div className="flex items-center gap-3 text-gray-300">
            <div
              className={`w-4 h-4 rounded-full ${
                currentStep >= 2 ? 'bg-green-500' : 'bg-gray-300'
              }`}
            ></div>
            <span className={currentStep >= 2 ? ' text-gray-600 font-semibold' : ''}>
              Step 2: vaidation sucess
            </span>
          </div>



                    {/* Step 3 */}
                   
                    <div className="flex items-center gap-3 text-gray-300">
            <div
              className={`w-4 h-4 rounded-full ${
                currentStep >= 3 ? 'bg-green-500' : 'bg-gray-300'
              }`}
            ></div>
            <span className={currentStep >= 3 ? ' text-gray-600 font-semibold' : ''}>
              Step 3: sucessfully added
            </span>
          </div>

          <br/>

          <span className={currentStep >= 3 ? 'text-green-600 font-bold' : 'hidden'}>
              Now Please click on <span className="text-green text-2xl font-extrabold">Login</span>to explore more
            </span>



                </div>
            </div>

            {/* Right Side – Form */}
            <div className="w-2/3 bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4 text-blue-900">Register</h2>
                {/* Form placeholder */}
               


                <form onSubmit={handleSubmit} className="space-y-4 mx-auto w-3/4">
                    {/* Name */}
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="w-full p-3 border rounded-md"
                            value={formData.name}
                            onChange={handleChange} />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="w-full p-3 border rounded-md"
                            value={formData.email}
                            onChange={handleChange} />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            className="w-full p-3 border rounded-md"
                            value={formData.phone}
                            onChange={handleChange} />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full p-3 border rounded-md"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password" />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-950 text-white py-2 rounded-md hover:bg-blue-900 transition"
                    >
                        Submit
                    </button>

                    {/* Success Message */}
                  
                </form>
                {success && <p className="text-green-600 text-2xl font-extrabold mt-3">{success}</p>}
            </div>
        </div>
    );
}

export default Register;
