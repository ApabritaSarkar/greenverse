import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
// Only import functions available in your profileApi.js
import { fetchUserProfile, addPlant, logout } from '../services/profileApi'; 
import { PlusCircle, User, Mail, Calendar, Sprout } from 'lucide-react'; // Icons

const Profile = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState(''); // For success messages
    
    // States for "Add Plant" form
    const [plantName, setPlantName] = useState('');
    const [datePlanted, setDatePlanted] = useState('');
    const [status, setStatus] = useState('');
    const [isAddingPlant, setIsAddingPlant] = useState(false); // Loading state for add plant

    // Fetch user profile on component mount
    useEffect(() => {
        const getUserProfile = async () => {
            setIsLoading(true);
            setError('');
            try {
                const data = await fetchUserProfile();
                // Normalize data from API to ensure required properties exist
                // Assuming your API returns 'username', 'email', and 'plants' (which has '_id', 'name', 'datePlanted', 'status')
                // and potentially 'profilePicture', 'bio', 'memberSince'.
                const normalizedUserData = {
                    ...data,
                    plants: data.plants || [], // Ensure plants array is always present
                    profilePicture: data.profilePicture || 'https://placehold.co/150x150/9AE6B4/2D3748?text=User', // Placeholder if missing
                    bio: data.bio || 'No bio provided.', // Placeholder if missing
                    memberSince: data.memberSince || 'N/A', // Placeholder if missing
                    plantsOwned: data.plants ? data.plants.length : 0 // Recalculate if needed
                };
                setUser(normalizedUserData);
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError(err.message || 'You must be logged in to view profile.');
                localStorage.removeItem('token'); // Clear token if fetch fails (e.g., expired token)
                setIsLoggedIn(false);
                navigate('/login'); // Redirect to login if not authenticated
            } finally {
                setIsLoading(false);
            }
        };
        getUserProfile();
    }, [navigate, setIsLoggedIn]); // Dependencies for useEffect

    // Handle user logout
    const handleLogout = () => {
        logout(); // Call the logout function from profileApi
        setIsLoggedIn(false);
        navigate('/'); // Redirect to home page after logout
    };

    // Handle adding a new plant
    const handleAddPlant = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages
        setError(''); // Clear previous errors

        if (!plantName || !datePlanted || !status) {
            setError('Please fill in all plant details.');
            return;
        }

        setIsAddingPlant(true);
        const newPlant = { name: plantName, datePlanted, status };

        try {
            const data = await addPlant(newPlant);
            // Assuming `data` from your API response for addPlant directly contains the added plant object.
            // If it returns an object like { message: "Added", plant: {...} }, then `data.plant` is correct.
            // If it just returns the plant object itself, then `data` should be used directly.
            // Let's assume `data` contains the plant, and it has an `_id` property.
            setUser((prev) => ({
                ...prev,
                // Ensure prev.plants is an array before spreading
                plants: [...(prev.plants || []), { ...data, _id: data._id || `temp_${Date.now()}` }], // Use data directly and ensure _id
                plantsOwned: (prev.plantsOwned || 0) + 1 // Increment plants owned count
            }));
            setPlantName('');
            setDatePlanted('');
            setStatus('');
            setMessage('Plant added successfully!');
        } catch (err) {
            setError('Failed to add plant: ' + err.message);
        } finally {
            setIsAddingPlant(false);
        }
    };

    // --- Conditional Rendering for Loading/Error States ---
    if (isLoading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-eco-offwhite pt-20">
                <div className="text-eco-green text-xl font-semibold">Loading user profile...</div>
            </div>
        );

    // This specific error block is for when the user is genuinely not logged in or token is bad
    // It should only show if `user` is null/undefined AND there's an error.
    if (!user && error) 
        return (
            <div className="min-h-screen flex items-center justify-center bg-eco-offwhite pt-20">
                <p className="text-red-600 text-center p-6">{error}</p>
            </div>
        );

    // If user data is successfully loaded, render the profile
    return (
        <div className="min-h-screen bg-eco-offwhite p-4 pt-20 font-roboto">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 border border-gray-200">
                <h1 className="text-4xl md:text-5xl font-bold text-center text-eco-green mb-8 font-inter">Your GreenVerse Profile</h1>

                {/* General Messages (Success/Error) */}
                {message && (
                    <p className={`text-sm text-center py-2 rounded-md mb-4 font-medium 
                        ${message.includes('successfully') ? 'bg-eco-lightgreen bg-opacity-20 text-eco-green' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </p>
                )}
                {/* Only show error if message is not also present (to avoid double messages) */}
                {error && !message && ( 
                    <p className="bg-red-100 text-red-700 text-sm text-center py-2 rounded-md mb-4 font-medium">
                        {error}
                    </p>
                )}

                {/* Profile Information Section - Display Only (No Edit) */}
                <div className="bg-eco-beige bg-opacity-50 p-6 rounded-lg shadow-inner mb-8">
                    <div className="flex justify-between items-center mb-4 border-b pb-3 border-eco-lightgreen">
                        <h2 className="text-2xl font-semibold text-eco-dark font-inter">User Information</h2>
                        {/* No Edit Profile button as per current API */}
                    </div>

                    <div className="text-center">
                        <img 
                            src={user.profilePicture} 
                            alt="Profile" 
                            className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-eco-lightgreen shadow-md"
                        />
                        <h3 className="text-3xl font-bold text-eco-dark mb-2 font-inter">{user.username}</h3>
                        <p className="text-gray-600 mb-4">{user.email}</p>
                        
                        <div className="max-w-2xl mx-auto text-left space-y-3 mt-8">
                            <p className="text-lg flex items-center space-x-2"><User size={20} className="text-eco-green"/> <span className="font-semibold text-eco-green">Username:</span> <span className="text-gray-700">{user.username}</span></p>
                            <p className="text-lg flex items-center space-x-2"><Mail size={20} className="text-eco-green"/> <span className="font-semibold text-eco-green">Email:</span> <span className="text-gray-700">{user.email}</span></p>
                            {/* Assuming bio and memberSince might not be directly returned by fetchUserProfile in your current API based on your original Profile.js structure.
                                If they are part of the fetched 'data', they will be displayed. Otherwise, they might show default values from normalization. */}
                            <p className="text-lg flex items-center space-x-2"><Calendar size={20} className="text-eco-green"/> <span className="font-semibold text-eco-green">Member Since:</span> <span className="text-gray-700">{user.memberSince}</span></p>
                            <p className="text-lg flex items-center space-x-2"><Sprout size={20} className="text-eco-green"/> <span className="font-semibold text-eco-green">Plants Owned:</span> <span className="text-gray-700">{user.plantsOwned}</span></p>
                            <p className="text-lg flex items-center space-x-2"><span className="font-semibold text-eco-green">Bio:</span> <span className="text-gray-700">{user.bio}</span></p>
                        </div>
                    </div>
                </div>

                {/* Owned Plants Section */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
                    <h2 className="text-2xl font-semibold text-eco-dark mb-4 font-inter border-b pb-3 border-eco-lightgreen">
                        Your Owned Plants ({user.plants ? user.plants.length : 0})
                    </h2>
                    {user.plants && user.plants.length > 0 ? (
                        <ul className="space-y-3">
                            {user.plants.map((plant) => (
                                <li key={plant._id} className="bg-eco-lightgreen bg-opacity-20 p-4 rounded-lg shadow-sm flex items-center space-x-3">
                                    <Sprout size={24} className="text-eco-green flex-shrink-0" />
                                    <div>
                                        <strong className="text-eco-dark text-lg">{plant.name}</strong> 
                                        <p className="text-gray-600 text-sm">Planted on {new Date(plant.datePlanted).toLocaleDateString()} (<span className="font-medium text-eco-green">{plant.status}</span>)</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 italic py-4 text-center">You haven't added any plants yet.</p>
                    )}
                </div>

                {/* Add Plant Form */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
                    <h2 className="text-2xl font-semibold text-eco-dark mb-4 font-inter border-b pb-3 border-eco-lightgreen">
                        Add a New Plant
                    </h2>
                    <form onSubmit={handleAddPlant} className="space-y-4">
                        <div>
                            <label htmlFor="plantName" className="block text-sm font-medium text-eco-dark mb-1">Plant Name</label>
                            <input
                                type="text"
                                id="plantName"
                                value={plantName}
                                onChange={(e) => setPlantName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent transition-all duration-200 text-eco-dark"
                                placeholder="e.g., Fiddle Leaf Fig"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="datePlanted" className="block text-sm font-medium text-eco-dark mb-1">Date Planted</label>
                            <input
                                type="date"
                                id="datePlanted"
                                value={datePlanted}
                                onChange={(e) => setDatePlanted(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent transition-all duration-200 text-eco-dark"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="plantStatus" className="block text-sm font-medium text-eco-dark mb-1">Status</label>
                            <input
                                type="text"
                                id="plantStatus"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent transition-all duration-200 text-eco-dark"
                                placeholder="e.g., Thriving, Needs water, Growing"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-eco-green to-eco-blue text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 w-full flex items-center justify-center space-x-2"
                            disabled={isAddingPlant}
                        >
                            {isAddingPlant ? (
                                <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : <PlusCircle size={20} />}
                            <span>{isAddingPlant ? 'Adding...' : 'Add Plant'}</span>
                        </button>
                    </form>
                </div>

                {/* Logout Button */}
                <div className="flex justify-center mt-10">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 font-semibold text-lg flex items-center space-x-2"
                    >
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
