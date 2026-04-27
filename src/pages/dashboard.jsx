import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/dashboard.css';
import csjLogo from '../csjlogo.png';

const PET_SIZE_RATES = {
    'Small': 799,
    'Medium': 899,
    'Large': 999,
    'Extra Large': 1099,
    'XXL': 1199
};

const SPECIAL_BREED_RATES = {
    'Husky': 1199,
    'Japanese Akita': 1199,
    'Chow Chow': 1199,
    'Belgian Malinois': 1199,
    'German Shepherd': 1199,
    'Rottweiler': 1199,
    'Samoyed': 1199,
    'Alaskan Malamute': 1299,
    'St. Bernard': 1299,
    'Standard Poodle': 1699,
    'Giant Poodle': 2699
};

const DISPLAY_BREED_LIST = [
    'Shih Tzu', 'Husky', 'Japanese Akita', 'Chow Chow',
    'Belgian Malinois', 'German Shepherd', 'Rottweiler',
    'Samoyed', 'Alaskan Malamute', 'St. Bernard',
    'Standard Poodle', 'Giant Poodle', 'Golden Retriever',
    'Chihuahua', 'Beagle'
];

const getPrice = (breed, size) => {
    const sizeRate = PET_SIZE_RATES[size] || 0;
    const breedRate = SPECIAL_BREED_RATES[breed] || 0;
    return sizeRate + breedRate;
};

const LIPA_BARANGAYS = [
    'Adya', 'Anilao', 'Anilao-Labac', 'Antipolo Del Norte', 'Antipolo Del Sur',
    'Bagong Pook', 'Balintawak', 'Banaybanay', 'Bolbok', 'Bugtong na Pulo',
    'Bulacnin', 'Bulaklakan', 'Calamias', 'Cumba', 'Dagatan', 'Duhatan',
    'Halang', 'Inosloban', 'Kayumanggi', 'Labac', 'Latag', 'Lodlod', 'Lumbang',
    'Malagonlong', 'Malitlit', 'Marawoy', 'Mataas Na Lupa', 'Munting Pulo',
    'Pagolingin Bata', 'Pagolingin East', 'Pagolingin West', 'Pangao', 'Pinagkawitan',
    'Pinagtongulan', 'Plaridel', 'Poblacion Barangay 1', 'Poblacion Barangay 2',
    'Poblacion Barangay 3', 'Poblacion Barangay 4', 'Poblacion Barangay 5',
    'Poblacion Barangay 6', 'Poblacion Barangay 7', 'Poblacion Barangay 8',
    'Poblacion Barangay 9', 'Poblacion Barangay 9-A', 'Poblacion Barangay 10',
    'Poblacion Barangay 11', 'Poblacion Barangay 12', 'Pusil', 'Quezon', 'Rizal',
    'Sabang', 'Sampaguita', 'San Benito', 'San Carlos', 'San Celestino',
    'San Francisco', 'San Guillermo', 'San Isidro', 'San Jose',
    'San Lucas', 'San Salvador', 'San Sebastian', 'Santo Niño',
    'Santo Toribio', 'Sapang', 'Sico', 'Talisay', 'Tambo', 'Tangob', 'Tanguay',
    'Tibig', 'Tipacan'
];

const FULL_BARANGAY_DATA = LIPA_BARANGAYS.map((name, i) => {
    if (name === 'Banaybanay') return { name, count: 41, revenue: 42800 };
    if (name === 'Adya') return { name, count: 32, revenue: 33500 };
    if (name === 'Antipolo Del Norte') return { name, count: 28, revenue: 29200 };
    if (name === 'Balintawak') return { name, count: 22, revenue: 23100 };
    if (name === 'Anilao') return { name, count: 15, revenue: 16400 };
    let count = Math.max(1, 14 - Math.floor(i / 5));
    return { name, count, revenue: count * 1100 };
}).sort((a, b) => b.count - a.count).map((item, index) => ({ ...item, rank: index + 1, isWinner: index === 0 }));

const App = () => {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState('overall');
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [overallView, setOverallView] = useState('main');
    const [showOverallSubmenu, setShowOverallSubmenu] = useState(false);
    const [showBreedsSubmenu, setShowBreedsSubmenu] = useState(false);
    const [stats, setStats] = useState({
        totalRevenue: 0,
        monthlyGrowth: 0,
        activeClients: 0,
        completedServices: 0
    });
    const [bookings, setBookings] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [modalContext, setModalContext] = useState(''); // 'booking' or 'customer'
    const [showCustomerForm, setShowCustomerForm] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [editingServiceId, setEditingServiceId] = useState(null);
    const [editingServicePrice, setEditingServicePrice] = useState('');
    const [showAllGroomedPets, setShowAllGroomedPets] = useState(false);
    const [showAllActiveBarangays, setShowAllActiveBarangays] = useState(false);


    useEffect(() => {
        setStats({
            totalRevenue: 785400,
            monthlyGrowth: 15.8,
            activeClients: 156,
            completedServices: 892
        });

        setBookings([
            {
                id: 1,
                clientName: 'Ana Arriola',
                petName2: 'Nea',
                breed: 'Golden Retriever',
                breed2: 'shitzu',
                petSize: 'Large',
                service: 'Large Size Package',
                date: '2026-03-15',
                time: '10:00 AM',
                status: 'accepted',
                price: getPrice('Golden Retriever', 'Large'),
                purok: '1'
            },
            {
                id: 2,
                clientName: 'Angela Cacao',
                petName: 'Luna',
                breed: 'Chihuahua',
                petSize: 'Small',
                service: 'Small Size Package',
                date: '2026-03-15',
                time: '11:30 AM',
                status: 'pending',
                price: getPrice('Chihuahua', 'Small'),
                purok: '2'
            },
            {
                id: 3,
                clientName: 'Mikaela Lantafe',
                petName: 'Max',
                petName2: 'Coffee',
                breed: 'Beagle',
                breed2: 'Siamese Cat',
                petSize: 'Medium',
                service: 'Medium Size Package',
                date: '2026-03-15',
                time: '2:00 PM',
                status: 'on the way',
                price: getPrice('Beagle', 'Medium'),
                purok: '3'
            },
            {
                id: 4,
                clientName: 'Alexie Magbuhat',
                petName: 'Bella',
                petName2: 'Whiskers',
                breed: 'Standard Poodle',
                breed2: 'Persian',
                petSize: 'Small',
                service: 'Standard Poodle Rate',
                date: '2026-03-16',
                time: '9:00 AM',
                status: 'cancelled',
                price: getPrice('Standard Poodle', 'Small'),
                purok: '4'
            }
        ]);

        setCustomers([
            {
                id: 1,
                name: 'Ana Arriola',
                email: 'ana.a@gmail.com',
                phone: '0917 123 4567',
                address: 'Purok 1, Barangay Marawoy',
                houseNumber: '456',
                purok: '1',
                barangay: 'Marawoy',
                status: 'Active',
                petName: 'Buddy',
                petSpecies: 'Dog',
                petType: 'Golden Retriever',
                petSize: 'Large',
                lastVisit: '2026-03-10',
                totalVisits: 12,
                petName2: 'Nea',
                petSpecies2: 'Dog',
                petType2: 'Shitzu',
                petSize2: 'Small'
            },
            {
                id: 2,
                name: 'Angela Cacao',
                email: 'angela.c@gmail.com',
                phone: '0920 234 5678',
                address: 'Purok 2, Barangay Sabang',
                houseNumber: '789',
                purok: '2',
                barangay: 'Sabang',
                status: 'Active',
                petName: 'Luna',
                petSpecies: 'Dog',
                petType: 'Chihuahua',
                petSize: 'Small',
                lastVisit: '2026-03-08',
                totalVisits: 8
            },
            {
                id: 3,
                name: 'Mikaela Lantafe',
                email: 'mikaela.l@gmail.com',
                phone: '0918 345 6789',
                address: 'Purok 3, Inosloban',
                houseNumber: '101',
                purok: '3',
                barangay: 'Inosluban',
                status: 'Inactive',
                petName: 'Max',
                petName2: 'Coffee',
                petSpecies: 'Dog',
                petSpecies2: 'Cat',
                petType: 'Beagle',
                petType2: 'Siamese Cat',
                petSize: 'Medium',
                petSize2: 'Small',
                lastVisit: '2026-03-12',
                totalVisits: 15
            },
            {
                id: 4,
                name: 'Alexie Magbuhat',
                email: 'alexie.m@gmail.com',
                phone: '0922 456 7890',
                address: 'Purok 4, Barangay Mataas na Lupa',
                houseNumber: '202',
                purok: '4',
                barangay: 'Mataas na Lupa',
                status: 'Active',
                petName: 'Bella',
                petName2: 'Whiskers',
                petSpecies: 'Dog',
                petSpecies2: 'Cat',
                petType: 'Poodle',
                petType2: 'Persian',
                petSize: 'Extra Large',
                petSize2: 'Small',
                lastVisit: '2026-03-16',
                totalVisits: 3
            }
        ]);

        setServices([
            { name: 'Small Size Package', price: 799, duration: '1 hour', bookings: 45 },
            { name: 'Medium Size Package', price: 899, duration: '1.5 hours', bookings: 32 },
            { name: 'Large Size Package', price: 999, duration: '2 hours', bookings: 28 },
            { name: 'Extra Large Package', price: 1099, duration: '2.5 hours', bookings: 18 },
            { name: 'XXL Size Package', price: 1199, duration: '3 hours', bookings: 15 },
            { name: 'Husky Rate', price: 1199, duration: '2.5 hours', bookings: 12 },
            { name: 'Chow Chow Rate', price: 1199, duration: '2.5 hours', bookings: 10 },
            { name: 'German Shepherd Rate', price: 1199, duration: '2.5 hours', bookings: 14 },
            { name: 'Standard Poodle Rate', price: 1699, duration: '3 hours', bookings: 8 },
            { name: 'Giant Poodle Rate', price: 2699, duration: '4 hours', bookings: 5 },
            { name: 'Cat Grooming', price: 899, duration: '1.5 hours', bookings: 25 }
        ]);
    }, []);

    const generateReport = () => {
        const reportData = {
            date: new Date().toLocaleDateString(),
            stats,
            bookings,
            customers,
            services
        };

        const reportWindow = window.open('', '_blank', 'width=900,height=700');
        if (!reportWindow) return;

        reportWindow.document.write(`
      <html>
        <head>
          <title>CSJ Pet Grooming - Business Report</title>
          <style>
            body { font-family: 'Segoe UI', sans-serif; margin: 30px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 40px; color: #2c3e50; }
            .header h1 { color: #3498db; margin-bottom: 10px; }
            .section { margin-bottom: 30px; }
            .section h2 { color: #3498db; border-bottom: 2px solid #3498db; padding-bottom: 5px; }
            .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px; }
            .stat-box { background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #3498db; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background: #3498db; color: white; font-weight: bold; }
            .total { font-weight: bold; background: #e8f4f8; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🐾 CSJ Pet Grooming Service</h1>
            <p>Business Analytics Report</p>
            <p><strong>Generated:</strong> ${reportData.date}</p>
          </div>
          
          <div class="section">
            <h2>📊 Business Overview</h2>
            <div class="stats-grid">
              <div class="stat-box">
                <strong>Total Revenue:</strong> ₱${reportData.stats.totalRevenue.toLocaleString()}
              </div>
              <div class="stat-box">
                <strong>Monthly Growth:</strong> ${reportData.stats.monthlyGrowth}%
              </div>
              <div class="stat-box">
                <strong>Active Clients:</strong> ${reportData.stats.activeClients}
              </div>
              <div class="stat-box">
                <strong>Completed Services:</strong> ${reportData.stats.completedServices}
              </div>
            </div>
          </div>

          <div class="section">
            <h2>📅 Recent Bookings</h2>
            <table>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Pet</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${reportData.bookings.map(booking => `
                  <tr>
                    <td>${booking.clientName}</td>
                    <td>${booking.petName}</td>
                    <td>${booking.service}</td>
                    <td>${booking.date}</td>
                    <td>${booking.time}</td>
                    <td>${booking.status.toUpperCase()}</td>
                    <td>₱${booking.price}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="section">
            <h2>👥 Customer List</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Pet</th>
                  <th>Pet Type</th>
                  <th>Pet Size</th>
                  <th>Last Visit</th>
                  <th>Total Visits</th>
                </tr>
              </thead>
              <tbody>
                ${reportData.customers.map(customer => `
                  <tr>
                    <td>${customer.name}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone}</td>
                    <td>${customer.petName}</td>
                    <td>${customer.petType}</td>
                    <td>${customer.petSize}</td>
                    <td>${customer.lastVisit}</td>
                    <td>${customer.totalVisits}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="section">
            <h2>✂️ Service Performance</h2>
            <table>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Price</th>
                  <th>Duration</th>
                  <th>Monthly Bookings</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                ${reportData.services.map(service => `
                  <tr>
                    <td>${service.name}</td>
                    <td>₱${service.price}</td>
                    <td>${service.duration}</td>
                    <td>${service.bookings}</td>
                    <td>₱${(service.price * service.bookings).toLocaleString()}</td>
                  </tr>
                `).join('')}
                <tr class="total">
                  <td colspan="4"><strong>Total</strong></td>
                  <td><strong>₱${reportData.services.reduce((sum, service) => sum + (service.price * service.bookings), 0).toLocaleString()}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `);
        reportWindow.document.close();
    };

    // Form handlers
    const handleAddCustomer = () => {
        setEditingCustomer(null);
        setShowCustomerForm(true);
    };

    const handleEditCustomer = (customer) => {
        setEditingCustomer(customer);
        setShowCustomerForm(true);
    };

    const handleFormSubmit = (formData) => {
        if (editingCustomer) {
            // Update existing customer/booking
            setBookings(prev => prev.map(booking =>
                booking.id === editingCustomer.id
                    ? { ...booking, ...formData }
                    : booking
            ));
            setCustomers(prev => prev.map(customer =>
                customer.id === editingCustomer.id
                    ? { ...customer, ...formData }
                    : customer
            ));
        } else {
            // Add new customer/booking
            const newBooking = {
                id: bookings.length + 1,
                ...formData,
                price: getPrice(formData.petSize, formData.breed)
            };

            const newCustomer = {
                id: customers.length + 1,
                customerName: formData.customerName,
                petName: formData.petName,
                breed: formData.breed,
                contactNumber: formData.contactNumber,
                address: formData.address,
                totalBookings: 1,
                loyaltyPoints: 0,
                membershipTier: 'Bronze',
                status: 'Active'
            };

            setBookings(prev => [...prev, newBooking]);
            setCustomers(prev => [...prev, newCustomer]);
        }

        setShowCustomerForm(false);
        setEditingCustomer(null);
    };

    const handleFormClose = () => {
        setShowCustomerForm(false);
        setEditingCustomer(null);
    };

    const updateBookingStatus = (bookingId, newStatus) => {
        setBookings(prev => prev.map(booking =>
            booking.id === bookingId ? { ...booking, status: newStatus } : booking
        ));
    };

    const viewCustomerDetails = (customer, context = 'booking') => {
        setSelectedCustomer(customer);
        setModalContext(context);
        setShowCustomerModal(true);
    };

    const closeCustomerModal = () => {
        setShowCustomerModal(false);
        setSelectedCustomer(null);
    };

    const getStatusBadge = (status) => {
        const styles = {
            pending: { background: '#fff3cd', color: '#856404' },
            'on the way': { background: '#cce5ff', color: '#004085' },
            accepted: { background: '#d4edda', color: '#155724' },
            cancelled: { background: '#f8d7da', color: '#721c24' }
        };
        const style = styles[status] || styles.pending;
        return { ...style, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' };
    };

    const filteredBookings = bookings.filter(booking =>
        booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.service.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderOverallAnalytics = () => {
        // Calculate groomed pets per barangay
        const barangayCounts = {};
        customers.forEach(c => {
            const b = c.barangay || 'Unknown';
            barangayCounts[b] = (barangayCounts[b] || 0) + 1;
        });

        const topCounts = [30, 25, 20, 16, 12];
        const groomedBarangays = LIPA_BARANGAYS.map((barangay, index) => ({
            barangay,
            count: index < topCounts.length ? topCounts[index] : Math.max(1, 10 - Math.floor(index / 8))
        })).sort((a, b) => b.count - a.count);

        // Calculate bookings and revenue per barangay
        const barangayRevenue = {};
        bookings.forEach(b => {
            const customer = customers.find(c => c.name === b.clientName);
            const brgy = customer ? customer.barangay : 'Unknown';
            if (!barangayRevenue[brgy]) {
                barangayRevenue[brgy] = { count: 0, revenue: 0 };
            }
            barangayRevenue[brgy].count += 1;
            barangayRevenue[brgy].revenue += b.price;
        });

        const barangayRankings = Object.entries(barangayRevenue)
            .map(([barangay, stats]) => ({
                barangay,
                count: stats.count,
                revenue: stats.revenue,
                isWinner: false
            }))
            .sort((a, b) => b.revenue - a.revenue)
            .map((item, index) => ({
                ...item,
                rank: index + 1,
                isWinner: index === 0
            }));

        return (
            <div className="overall-analytics">
                <div className="analytics-header">
                    <h2>📈 {overallView === 'performance' ? 'Revenue & Performance' : overallView === 'distribution' ? 'Revenue Distribution' : 'Overall Analytics'}</h2>
                </div>

                {/* Top Section: Table and Active Barangay */}
                {overallView === 'main' && (
                    <div className="analytics-modern-layout">
                        {/* Top Row Indicators */}
                        <div className="top-indicators-row">
                            <div className="indicator-card">
                                <div className="icon-circle icon-pink">💰</div>
                                <p className="indicator-title">TOTAL REVENUE</p>
                                <p className="indicator-value">₱ {stats.totalRevenue.toLocaleString()}</p>
                            </div>
                            <div className="indicator-card">
                                <div className="icon-circle icon-green">👥</div>
                                <p className="indicator-title">ACTIVE CLIENTS</p>
                                <p className="indicator-value">{stats.activeClients}</p>
                            </div>
                            <div className="indicator-card">
                                <div className="icon-circle icon-orange">✅</div>
                                <p className="indicator-title">COMPLETED SERVICES</p>
                                <p className="indicator-value">{stats.completedServices}</p>
                            </div>
                        </div>

                        {/* Bottom Split Row */}
                        <div className="bottom-split-row">
                            <div className="bottom-wide-card">
                                <div className="bottom-card-header">
                                    <h3 className="bottom-card-title">Barangay Grooming Trends</h3>
                                    <span className="view-all-link" onClick={() => setShowAllGroomedPets(!showAllGroomedPets)}>
                                        {showAllGroomedPets ? 'Show Top 5' : 'View All Areas'}
                                    </span>
                                </div>
                                <div className="barangay-table">
                                    <div className="table-body" style={{ maxHeight: showAllGroomedPets ? '400px' : 'auto', overflowY: showAllGroomedPets ? 'auto' : 'visible', overflowX: 'hidden' }}>
                                        <div className="table-header">
                                            <div className="table-cell">Barangay</div>
                                            <div className="table-cell text-right">Pets Groomed</div>
                                        </div>
                                        {groomedBarangays.slice(0, showAllGroomedPets ? 73 : 5).map(item => (
                                            <div key={item.barangay} className="table-row">
                                                <div className="table-cell">{item.barangay}</div>
                                                <div className="table-cell text-right">
                                                    <span className="pet-count-badge">{item.count} Pets</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bottom-wide-card">
                                <div className="bottom-card-header">
                                    <h3 className="bottom-card-title">Top Active Barangays</h3>
                                    <span className="view-all-link" onClick={() => setShowAllActiveBarangays(!showAllActiveBarangays)}>
                                        {showAllActiveBarangays ? 'Show Top 5' : 'View All Rankings'}
                                    </span>
                                </div>
                                <div className="barangay-rankings-container">
                                    <div className="barangay-rankings-list" style={{ maxHeight: showAllActiveBarangays ? '400px' : 'auto', overflowY: showAllActiveBarangays ? 'auto' : 'visible', overflowX: 'hidden' }}>
                                        <div className="active-barangay-header">
                                            <div className="header-rank">Rank</div>
                                            <div className="header-name">Barangay</div>
                                            <div className="header-metric">Bookings</div>
                                            <div className="header-revenue">Revenue</div>
                                        </div>
                                        {barangayRankings.slice(0, showAllActiveBarangays ? 73 : 5).map(item => (
                                            <div key={item.barangay} className={item.isWinner ? 'barangay-winner' : 'barangay-item'}>
                                                <div className="barangay-rank">#{item.rank}</div>
                                                <div className="barangay-name">{item.barangay}</div>
                                                <div className="barangay-metric">{item.count}</div>
                                                <div className="barangay-revenue">₱{item.revenue.toLocaleString()}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Premium Revenue Cards Section - Full Width Row */}
                {overallView === 'performance' && (
                    <div className="performance-view-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
                        <div className="premium-analytics-section" style={{ marginTop: 0 }}>
                            <div className="section-header-premium">
                                <h3><span className="animated-emoji">💰</span> Revenue & Performance per Barangay</h3>
                                <p>Detailed breakdown of earnings and customer reach</p>
                            </div>

                            <div className="revenue-premium-grid">
                                {[
                                    { name: 'Banaybanay', revenue: 42800, customers: 41, growth: '+15.2%' },
                                    { name: 'Adya', revenue: 33500, customers: 32, growth: '+14.1%' },
                                    { name: 'Antipolo del Norte', revenue: 29200, customers: 25, growth: '+9.5%' },
                                    { name: 'Balintawak', revenue: 23100, customers: 22, growth: '+11.2%' },
                                    { name: 'Anilao', revenue: 16400, customers: 15, growth: '+3.2%' }
                                ].map((item, index) => (
                                    <div key={index} className="premium-revenue-card">
                                        <div className="card-top">
                                            <span className="barangay-label">{item.name}</span>
                                            <span className="growth-badge">{item.growth}</span>
                                        </div>
                                        <div className="card-main">
                                            <div className="revenue-info">
                                                <span className="info-label">Total:</span>
                                                <span className="info-value">₱ {item.revenue.toLocaleString()}</span>
                                            </div>
                                            <p className="card-subtitle">Total Earned</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="premium-analytics-section" style={{ marginTop: 0 }}>
                            <div className="section-header-premium">
                                <h3>Top Performing Services</h3>
                                <p>Most popular and highest earning packages</p>
                            </div>
                            <div className="top-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                                {[...services]
                                    .sort((a, b) => (b.price * b.bookings) - (a.price * a.bookings))
                                    .slice(0, 4)
                                    .map((service, idx) => (
                                        <div key={idx} className="premium-service-card" style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <h4 style={{ margin: '0 0 0.5rem 0', color: '#17202a', fontSize: '1.1rem' }}>{service.name}</h4>
                                                <p style={{ margin: 0, color: '#95A5A6', fontSize: '0.85rem', fontWeight: 600 }}>{service.bookings} bookings • {service.duration}</p>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <span style={{ display: 'block', color: '#34A853', fontWeight: 800, fontSize: '1.2rem' }}>₱ {(service.price * service.bookings).toLocaleString()}</span>
                                                <span style={{ color: '#95A5A6', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Revenue</span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}
                {/* Revenue Distribution Enhanced Dashboard */}
                {overallView === 'distribution' && (
                    <div className="distribution-dashboard">
                        {/* Top Metric Cards */}
                        <div className="dist-metric-cards">
                            <div className="dist-card">
                                <span className="dist-card-label">Avg Revenue / Barangay</span>
                                <span className="dist-card-value">₱ 29,000</span>
                                <span className="dist-card-footer">↑ 8.4% vs last month</span>
                            </div>
                            <div className="dist-card">
                                <span className="dist-card-label">Market Leader</span>
                                <span className="dist-card-value">Banaybanay</span>
                                <span className="dist-card-footer">29.4% Market Share</span>
                            </div>
                            <div className="dist-card">
                                <span className="dist-card-label">Top Service Tier</span>
                                <span className="dist-card-value">Premium</span>
                                <span className="dist-card-footer">42% of Total Bookings</span>
                            </div>
                        </div>

                        <div className="visual-row">
                            {/* Detailed Bar Chart */}
                            <div className="luxury-chart-container">
                                <div className="chart-header">
                                    <div className="chart-title-group">
                                        <h4>Revenue Capacity by Barangay</h4>
                                        <p>Monthly earnings distribution across active areas</p>
                                    </div>
                                </div>
                                <div className="bar-viz-container">
                                    {[
                                        { label: 'Antipolo', val: 29200, percent: 68, color: '#94a3b8' },
                                        { label: 'Adya', val: 33500, percent: 78, color: '#64748b' },
                                        { label: 'Sabang', val: 39500, percent: 92, color: '#475569' },
                                        { label: 'Banaybanay', val: 42800, percent: 100, color: '#1e293b' }
                                    ].map((p, i) => (
                                        <div key={i} className="luxury-bar-wrapper">
                                            <div
                                                className="luxury-bar"
                                                style={{ height: `${p.percent}%`, background: p.color }}
                                                data-value={`₱${p.val.toLocaleString()}`}
                                            ></div>
                                            <span className="bar-label">{p.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Circular Share Viz */}
                            <div className="share-viz-container">
                                <div className="chart-title-group" style={{ textAlign: 'center' }}>
                                    <h4>Market Share</h4>
                                    <p>Revenue distribution (%)</p>
                                </div>
                                <div className="donut-box">
                                    <svg className="donut-svg" viewBox="0 0 100 100" style={{ shapeRendering: 'geometricPrecision' }}>
                                        <circle className="donut-ring" cx="50" cy="50" r="40" pathLength="100" />

                                        {/* Banaybanay - 29% (Yellow) */}
                                        <circle
                                            className="donut-segment"
                                            cx="50" cy="50" r="40"
                                            pathLength="100"
                                            strokeDasharray="29 71"
                                            strokeDashoffset="-78"
                                            stroke="#FFD700"
                                        />

                                        {/* Adya - 23% (Blue) */}
                                        <circle
                                            className="donut-segment"
                                            cx="50" cy="50" r="40"
                                            pathLength="100"
                                            strokeDasharray="23 77"
                                            strokeDashoffset="40"
                                            stroke="#007bff"
                                        />

                                        {/* Antipolo - 20% (Green) */}
                                        <circle
                                            className="donut-segment"
                                            cx="50" cy="50" r="40"
                                            pathLength="100"
                                            strokeDasharray="20 80"
                                            strokeDashoffset="-52"
                                            stroke="#34A853"
                                        />

                                        {/* Others - 28% (Gray) */}
                                        <circle
                                            className="donut-segment"
                                            cx="50" cy="50" r="40"
                                            pathLength="100"
                                            strokeDasharray="28 72"
                                            strokeDashoffset="100"
                                            stroke="#7F8C8D"
                                        />
                                    </svg>
                                    <div className="donut-content">
                                        <span className="donut-val">100%</span>
                                        <span className="donut-lbl">Total Ops</span>
                                    </div>
                                </div>
                                <div className="share-legend">
                                    <div className="legend-card"><span className="dot" style={{ background: '#FFD700' }}></span> Banaybanay (29%)</div>
                                    <div className="legend-card"><span className="dot" style={{ background: '#007bff' }}></span> Adya (23%)</div>
                                    <div className="legend-card"><span className="dot" style={{ background: '#34A853' }}></span> Antipolo (20%)</div>
                                    <div className="legend-card"><span className="dot" style={{ background: '#7F8C8D' }}></span> Sabang (28%)</div>
                                </div>
                            </div>
                        </div>

                        {/* Barangay Leaderboard */}
                        <div className="rank-list-row">
                            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#17202A' }}>🏆 Performance Leaderboard</h4>
                            <table className="dist-table">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Barangay</th>
                                        <th>Growth Trend</th>
                                        <th>Top Service</th>
                                        <th>Avg Ticket</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { rank: 1, name: 'Banaybanay', growth: '+15.2%', service: 'Premium Package', avg: '₱ 1,043', status: 'pos', color: '#FFD700' },
                                        { rank: 2, name: 'Adya', growth: '+14.1%', service: 'Full Grooming', avg: '₱ 946', status: 'pos', color: '#1E88E5' },
                                        { rank: 3, name: 'Antipolo Norte', growth: '+9.5%', service: 'Basic Bath', avg: '₱ 850', status: 'pos', color: '#34A853' },
                                        { rank: 4, name: 'Sabang', growth: '+0.5%', service: 'Various', avg: '₱ 810', status: 'neutral', color: '#7F8C8D' }
                                    ].map((row, i) => (
                                        <tr key={i}>
                                            <td style={{ color: row.color, fontSize: '1.2rem', fontWeight: '800' }}>#{row.rank}</td>
                                            <td style={{ color: '#17202A' }}>{row.name}</td>
                                            <td><span className={`growth-pill ${row.status === 'pos' ? 'pill-pos' : 'pill-neutral'}`}>{row.growth}</span></td>
                                            <td><span className="service-tag">{row.service}</span></td>
                                            <td style={{ color: 'var(--secondary-blue)' }}>{row.avg}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderBreedsAnalytics = () => {
        const finalCounts = {};

        // Initialize all displayed breeds with 0
        DISPLAY_BREED_LIST.forEach(breed => {
            finalCounts[breed] = 0;
        });

        // Count actual occurrences from customers
        customers.forEach(c => {
            const processBreed = (b) => {
                if (!b) return;
                // Normalize for matching: Title Case
                const normalized = b.trim().toLowerCase().split(' ').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');

                // If it's in our display list, use that exact string, otherwise add it as new
                const matchingKey = DISPLAY_BREED_LIST.find(k => k.toLowerCase() === normalized.toLowerCase()) || normalized;
                finalCounts[matchingKey] = (finalCounts[matchingKey] || 0) + 1;
            };

            processBreed(c.petType);
            processBreed(c.petType2);
        });

        const sortedBreeds = Object.entries(finalCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

        const maxCount = Math.max(...sortedBreeds.map(b => b.count), 1);

        return (
            <div className="breeds-analytics">
                <div className="analytics-header">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h2>🐕 Breed Distribution</h2>
                            <p>Complete overview of pet breeds population</p>
                        </div>
                        <div className="breed-stats-summary" style={{ display: 'flex', gap: '1rem' }}>
                            <span className="summary-badge" style={{ background: 'white', padding: '6px 12px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                Total: {sortedBreeds.length} Breeds
                            </span>
                        </div>
                    </div>
                </div>

                <div className="breeds-grid">
                    {sortedBreeds.map((breed, index) => (
                        <div key={index} className={`breed-card ${breed.count === 0 ? 'empty-breed' : ''}`} style={{ opacity: breed.count === 0 ? 0.7 : 1 }}>
                            <div className="breed-info">
                                <span className="breed-name">{breed.name}</span>
                                <span className={`breed-count ${breed.count > 0 ? 'has-pets' : ''}`} style={{
                                    background: breed.count > 0 ? 'var(--light-yellow)' : '#f1f5f9',
                                    color: breed.count > 0 ? '#1e3a8a' : '#64748b',
                                    padding: '4px 10px',
                                    borderRadius: '20px',
                                    fontSize: '0.85rem',
                                    fontWeight: 'bold'
                                }}>
                                    {breed.count} {breed.count === 1 ? 'Pet' : 'Pets'}
                                </span>
                            </div>
                            <div className="breed-progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{
                                        width: `${(breed.count / maxCount) * 100}%`,
                                        background: breed.count === 0 ? '#e2e8f0' : (index % 3 === 0 ? 'var(--primary-yellow)' : index % 3 === 1 ? 'var(--secondary-blue)' : 'var(--accent-green)')
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderOverview = () => {
        const totalRevenue = services.reduce((sum, service) => sum + (service.price * service.bookings), 0);
        const totalBookings = services.reduce((sum, service) => sum + service.bookings, 0);
        const avgPrice = Math.round(totalRevenue / totalBookings);
        const topService = services.sort((a, b) => (b.price * b.bookings) - (a.price * a.bookings))[0];
        const premiumBookings = services
            .filter(s => s.price >= 1000)
            .reduce((sum, s) => sum + s.bookings, 0);
        const premiumPercent = Math.round((premiumBookings / totalBookings) * 100);

        return (
            <div className="dashboard-grid">
                <div className="services-performance-cards">
                    {/* Section Header */}
                    <div className="section-title">
                        <h2><span className="title-icon">✂️</span> Service Performance</h2>
                    </div>

                    {/* Metric Cards */}
                    <div className="metric-cards-row">
                        <div className="metric-card">
                            <div className="metric-label">AVG REVENUE / BOOKING</div>
                            <div className="metric-value">₱ {avgPrice.toLocaleString()}</div>
                            <div className="metric-caption up">↑ 8.4% vs last month</div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-label">TOP SERVICE</div>
                            <div className="metric-value">{topService?.name}</div>
                            <div className="metric-caption">{Math.round((topService?.price * topService?.bookings / totalRevenue) * 100)}% of Total Revenue</div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-label">PREMIUM TIER</div>
                            <div className="metric-value">{premiumPercent}%</div>
                            <div className="metric-caption yellow">of Total Bookings</div>
                        </div>
                    </div>

                    {/* Services Table */}
                    <div className="table-section">
                        <div className="table-container">
                            <table className="dashboard-table">
                                <thead>
                                    <tr>
                                        <th>Service Name</th>
                                        <th>Price</th>
                                        <th>Bookings</th>
                                        <th>Duration</th>
                                        <th>Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services
                                        .sort((a, b) => (b.price * b.bookings) - (a.price * a.bookings))
                                        .map((service, index) => {
                                            const revenue = service.price * service.bookings;

                                            return (
                                                <tr key={index}>
                                                    <td className="service-name">{service.name}</td>
                                                    <td>₱{service.price}</td>
                                                    <td>{service.bookings}</td>
                                                    <td>{service.duration}</td>
                                                    <td className="revenue">₱{revenue.toLocaleString()}</td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderBookings = () => {
        return (
            <div className="bookings-modern">
                {/* Header */}
                <div className="bookings-top-header">
                    <h2><span className="header-emoji">📅</span> Booking Management</h2>
                    <div className="header-tools">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Search bookings..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-modern"
                            />
                            <span className="search-icon">🔍</span>
                        </div>
                        <div className="date-box">
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="date-modern"
                            />
                        </div>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="booking-stats">
                    <div className="stat-box">
                        <span className="stat-number">{filteredBookings.length}</span>
                        <span className="stat-label">Total Bookings</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-number">
                            {filteredBookings.filter(b => b.status === 'accepted').length}
                        </span>
                        <span className="stat-label">Accepted</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-number">
                            {filteredBookings.filter(b => b.status === 'pending').length}
                        </span>
                        <span className="stat-label">Pending</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-number">
                            ₱{filteredBookings.reduce((sum, b) => sum + b.price, 0).toLocaleString()}
                        </span>
                        <span className="stat-label">Total Revenue</span>
                    </div>
                </div>

                {/* Booking Table */}
                <div className="dashboard-table-container">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Service</th>
                                <th>Date & Time</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map(booking => (
                                <tr key={booking.id}>
                                    <td>
                                        <div style={{ fontWeight: 'bold' }}>{booking.clientName}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Pet: {booking.petName}</div>
                                    </td>
                                    <td>
                                        <div>{booking.service}</div>
                                        {SPECIAL_BREED_RATES[booking.breed] && (
                                            <span style={{ fontSize: '0.7rem', background: '#fef3c7', color: '#d97706', padding: '2px 6px', borderRadius: '4px' }}>Special Breed</span>
                                        )}
                                    </td>
                                    <td>
                                        <div>{booking.date}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{booking.time}</div>
                                    </td>
                                    <td style={{ fontWeight: 'bold' }}>₱{booking.price.toLocaleString()}</td>
                                    <td>
                                        <select
                                            value={booking.status}
                                            onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                                            className="status-select-sm"
                                            style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="on the way">On the Way</option>
                                            <option value="accepted">Accepted</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-primary"
                                            onClick={() => {
                                                const customer = customers.find(c => c.name === booking.clientName);
                                                if (customer) {
                                                    viewCustomerDetails(customer, 'booking');
                                                } else {
                                                    viewCustomerDetails({
                                                        name: booking.clientName,
                                                        email: '',
                                                        phone: '',
                                                        status: 'Active',
                                                        houseNumber: 'N/A',
                                                        purok: 'N/A',
                                                        barangay: 'N/A',
                                                        petName: booking.petName,
                                                        petSpecies: 'Dog',
                                                        petType: booking.breed,
                                                        petSize: booking.petSize,
                                                        lastVisit: booking.date,
                                                        totalVisits: 1
                                                    }, 'booking');
                                                }
                                            }}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderCustomers = () => {
        return (
            <div className="customers-modern">
                {/* Header */}
                <div className="customers-top-header">
                    <h2><span className="header-emoji">👥</span> Customer List</h2>
                    <div className="header-tools">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Search customers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-modern"
                            />
                            <span className="search-icon">🔍</span>
                        </div>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="customer-stats">
                    <div className="stat-box">
                        <span className="stat-number">{filteredCustomers.length}</span>
                        <span className="stat-label">Total Customers</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-number">
                            {filteredCustomers.filter(c => c.totalVisits >= 5).length}
                        </span>
                        <span className="stat-label">VIP Members</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-number">
                            {filteredCustomers.filter(c => c.totalVisits >= 1).length}
                        </span>
                        <span className="stat-label">Active</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-number">
                            {filteredCustomers.reduce((sum, c) => sum + c.totalVisits, 0)}
                        </span>
                        <span className="stat-label">Total Visits</span>
                    </div>
                </div>

                {/* Customers Table */}
                <div className="dashboard-table-container">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Contact Info</th>
                                <th>Address</th>
                                <th>Visits</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map(customer => (
                                <tr key={customer.id}>
                                    <td>
                                        <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{customer.name}</div>
                                    </td>
                                    <td>
                                        <div>{customer.email}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{customer.phone}</div>
                                    </td>
                                    <td>
                                        <div>{customer.houseNumber}, {customer.purok}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{customer.barangay}</div>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 'bold' }}>{customer.totalVisits} visits</div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Last: {customer.lastVisit}</div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                className="btn-primary"
                                                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                                                onClick={() => viewCustomerDetails(customer, 'customer')}
                                            >
                                                Details
                                            </button>
                                            <button
                                                className="btn-warning"
                                                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                                                onClick={() => viewCustomerDetails(customer, 'loyalty')}
                                            >
                                                Loyalty
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const handleServicePriceEdit = (index, currentPrice) => {
        setEditingServiceId(index);
        setEditingServicePrice(String(currentPrice));
    };

    const handleServicePriceSave = (index) => {
        const newPrice = parseInt(editingServicePrice, 10);
        if (!isNaN(newPrice) && newPrice > 0) {
            setServices(prev => prev.map((s, i) =>
                i === index ? { ...s, price: newPrice } : s
            ));
        }
        setEditingServiceId(null);
        setEditingServicePrice('');
    };

    const handleServicePriceCancel = () => {
        setEditingServiceId(null);
        setEditingServicePrice('');
    };

    const handleServiceDelete = (index) => {
        if (window.confirm(`Are you sure you want to delete the "${services[index].name}" service?`)) {
            setServices(prev => prev.filter((_, i) => i !== index));
        }
    };

    const renderServices = () => {
        return (
            <div className="services-tbl-wrapper">
                <div className="services-tbl-header">
                    <span className="services-tbl-icon">✂️</span>
                    <div>
                        <h2>Services Management</h2>
                        <p>Click the edit icon to update a service price</p>
                    </div>
                </div>

                <div className="dashboard-table-container">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>SERVICE NAME &amp; DESCRIPTION</th>
                                <th>DURATION</th>
                                <th>PRICE</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service, index) => (
                                <tr key={index} className={editingServiceId === index ? 'svc-row editing' : 'svc-row'}>
                                    <td className="svc-name-cell">
                                        <span className="svc-emoji">
                                            {service.name.toLowerCase().includes('cat') ? '🐱' :
                                                service.name.toLowerCase().includes('poodle') ? '🐩' :
                                                    service.name.toLowerCase().includes('husky') ||
                                                        service.name.toLowerCase().includes('shepherd') ||
                                                        service.name.toLowerCase().includes('chow') ||
                                                        service.name.toLowerCase().includes('akita') ||
                                                        service.name.toLowerCase().includes('bernard') ||
                                                        service.name.toLowerCase().includes('malamute') ||
                                                        service.name.toLowerCase().includes('samoyed') ? '🐕' : '🐾'}
                                        </span>
                                        <span className="svc-name">{service.name}</span>
                                    </td>
                                    <td className="svc-duration-cell">{service.duration}</td>
                                    <td className="svc-price-cell">
                                        {editingServiceId === index ? (
                                            <div className="price-input-wrapper">
                                                <span>₱</span>
                                                <input
                                                    id={`service-price-input-${index}`}
                                                    type="number"
                                                    value={editingServicePrice}
                                                    onChange={e => setEditingServicePrice(e.target.value)}
                                                    onKeyDown={e => {
                                                        if (e.key === 'Enter') handleServicePriceSave(index);
                                                        if (e.key === 'Escape') handleServicePriceCancel();
                                                    }}
                                                    autoFocus
                                                    min="1"
                                                />
                                            </div>
                                        ) : (
                                            <span style={{ fontWeight: 'bold' }}>₱{service.price.toLocaleString()}</span>
                                        )}
                                    </td>
                                    <td className="svc-actions-cell">
                                        {editingServiceId === index ? (
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    id={`save-price-${index}`}
                                                    className="save-btn"
                                                    onClick={() => handleServicePriceSave(index)}
                                                    title="Save"
                                                >✓</button>
                                                <button
                                                    id={`cancel-price-${index}`}
                                                    className="cancel-btn"
                                                    onClick={handleServicePriceCancel}
                                                    title="Cancel"
                                                    style={{ background: '#f8d7da', color: '#721c24', border: 'none', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', fontSize: '1.1rem' }}
                                                >✕</button>
                                            </div>
                                        ) : (
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    id={`edit-price-${index}`}
                                                    className="edit-btn"
                                                    onClick={() => handleServicePriceEdit(index, service.price)}
                                                    title="Edit Price"
                                                >✏️</button>
                                                <button
                                                    id={`delete-service-${index}`}
                                                    className="delete-btn"
                                                    onClick={() => handleServiceDelete(index)}
                                                    title="Delete Service"
                                                >🗑️</button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div className="app">
            <nav className="sidebar">
                <div className="sidebar-nav-group">
                    <div className="sidebar-logo">
                        <img src={csjLogo} alt="CSJ Logo" className="logo-img" />
                    </div>
                    <div className="nav-item nav-item-group">
                        <button
                            onClick={() => {
                                setShowOverallSubmenu(!showOverallSubmenu);
                                setActiveView('overall');
                                setOverallView('main');
                            }}
                            className={`submenu-toggle ${(activeView === 'overall') ? 'active' : ''}`}
                            title="Overall Analytics"
                        >
                            <div className="nav-label">
                                <span className="nav-icon">📈</span>
                                <span className="nav-text">Overall Analytics</span>
                            </div>
                            <span className="nav-caret">{showOverallSubmenu ? '▲' : '▼'}</span>
                        </button>

                        {showOverallSubmenu && (
                            <div className="submenu-items">
                                <button
                                    onClick={() => { setActiveView('overall'); setOverallView('performance'); }}
                                    className={activeView === 'overall' && overallView === 'performance' ? 'sub-active' : ''}
                                >
                                    Revenue & Performance
                                </button>
                                <button
                                    onClick={() => { setActiveView('overall'); setOverallView('distribution'); }}
                                    className={activeView === 'overall' && overallView === 'distribution' ? 'sub-active' : ''}
                                >
                                    Revenue Distribution
                                </button>
                                <button
                                    onClick={() => { setActiveView('overall'); setOverallView('breeds'); }}
                                    className={activeView === 'overall' && overallView === 'breeds' ? 'sub-active' : ''}
                                >
                                    Breeds Distribution
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="nav-item">
                        <button
                            onClick={() => setActiveView('overview')}
                            className={activeView === 'overview' ? 'active' : ''}
                            title="Analytics Overview"
                        >
                            <span className="nav-icon">📊</span>
                            <span className="nav-text">Analytics Overview</span>
                        </button>
                    </div>
                    <div className="nav-item">
                        <button
                            onClick={() => setActiveView('services')}
                            className={activeView === 'services' ? 'active' : ''}
                            title="Services"
                        >
                            <span className="nav-icon">✂️</span>
                            <span className="nav-text">Services</span>
                        </button>
                    </div>
                    <div className="nav-item">
                        <button
                            onClick={() => setActiveView('bookings')}
                            className={activeView === 'bookings' ? 'active' : ''}
                            title="Booking Monitoring"
                        >
                            <span className="nav-icon">📅</span>
                            <span className="nav-text">Booking Monitoring</span>
                        </button>
                    </div>
                    <div className="nav-item">
                        <button
                            onClick={() => setActiveView('customers')}
                            className={activeView === 'customers' ? 'active' : ''}
                            title="Customer List"
                        >
                            <span className="nav-icon">👥</span>
                            <span className="nav-text">Customer List</span>
                        </button>
                    </div>
                </div>

                <div className="sidebar-footer">
                    <button onClick={generateReport} className="sidebar-report-btn">
                        🖨️ Generate Report
                    </button>

                </div>
            </nav>

            <div className="main-wrapper">
                <header className="app-header">
                    <div className="header-title">
                        <h1>CSJ Pet Grooming Dashboard</h1>
                    </div>
                    <div className="header-actions">
                        <button onClick={() => setShowLogoutModal(true)} className="btn-logout">
                            🚪 Logout
                        </button>
                    </div>
                </header>

                <main className="main-content">
                    <div key={activeView === 'overall' ? `overall-${overallView}` : activeView} className="fade-in-view">
                        {activeView === 'overall' && overallView !== 'breeds' && renderOverallAnalytics()}
                        {activeView === 'overall' && overallView === 'breeds' && renderBreedsAnalytics()}
                        {activeView === 'overview' && renderOverview()}
                        {activeView === 'services' && renderServices()}
                        {activeView === 'bookings' && renderBookings()}
                        {activeView === 'customers' && renderCustomers()}
                    </div>
                </main>
            </div>

            {showLogoutModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Confirm Logout</h3>
                        <p>Are you sure you want to logout of the CSJ Pet Grooming dashboard?</p>
                        <div className="modal-actions">
                            <button onClick={() => setShowLogoutModal(false)} className="btn-secondary">
                                Cancel
                            </button>
                            <button onClick={() => { setShowLogoutModal(false); navigate('/login'); }} className="btn-warning">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showCustomerModal && selectedCustomer && (
                <div className="modal-overlay">
                    <div className="modal customer-modal">
                        <div className="modal-header">
                            <h3>👥 Customer Details</h3>
                            <button className="close-btn" onClick={closeCustomerModal}>
                                ×
                            </button>
                        </div>
                        <div className="modal-content">
                            <div className="customer-info-section">
                                <h4>📋 {modalContext === 'customer' ? 'Customer Information' : modalContext === 'loyalty' ? 'Loyalty Status' : 'Pet Details'}</h4>
                                <div className="info-grid">
                                    {modalContext === 'loyalty' ? (
                                        <>
                                            <div className="info-item">
                                                <span className="label">Customer Name:</span>
                                                <span className="value">{selectedCustomer.name}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="label">Loyalty Points:</span>
                                                <span className="value">{selectedCustomer.totalVisits * 10} points</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="label">Total Grooming Sessions:</span>
                                                <span className="value">{selectedCustomer.totalVisits} visits</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="label">Loyalty Tier:</span>
                                                <span className="value">
                                                    {selectedCustomer.totalVisits >= 20 ? "🌟 Gold Member" :
                                                        selectedCustomer.totalVisits >= 10 ? "🥈 Silver Member" :
                                                            selectedCustomer.totalVisits >= 5 ? "🥉 Bronze Member" :
                                                                "📝 New Member"}
                                                </span>
                                            </div>
                                            <div className="info-item">
                                                <span className="label">Next Reward:</span>
                                                <span className="value">
                                                    {selectedCustomer.totalVisits >= 20 ? "Free premium service" :
                                                        selectedCustomer.totalVisits >= 10 ? "20% discount on next visit" :
                                                            selectedCustomer.totalVisits >= 5 ? "10% discount on next visit" :
                                                                "5 more visits for Bronze tier"}
                                                </span>
                                            </div>
                                            <div className="info-item">
                                                <span className="label">Member Since:</span>
                                                <span className="value">{selectedCustomer.lastVisit}</span>
                                            </div>
                                        </>
                                    ) : modalContext === 'customer' ? (
                                        <>
                                            <div className="info-item">
                                                <span className="label">Name:</span>
                                                <span className="value">{selectedCustomer.name}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="label">Email:</span>
                                                <span className="value">{selectedCustomer.email}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="label">Phone:</span>
                                                <span className="value">{selectedCustomer.phone}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="label">House Number:</span>
                                                <span className="value">{selectedCustomer.houseNumber}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="label">Purok:</span>
                                                <span className="value">{selectedCustomer.purok}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="label">Barangay:</span>
                                                <span className="value">{selectedCustomer.barangay}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="label">City:</span>
                                                <span className="value">Lipa City</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="label">Landmark:</span>
                                                <span className="value">
                                                    {selectedCustomer.id === 1 ? "Near SM Lipa" :
                                                        selectedCustomer.id === 2 ? "Near Puregold" :
                                                            selectedCustomer.id === 3 ? "Near Kwatogs" :
                                                                selectedCustomer.id === 4 ? "Near De La Salle Lipa" :
                                                                    "Near City Hall"}
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="info-item">
                                                <span className="label">Pet Name:</span>
                                                <span className="value">{selectedCustomer.petName}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="label">Pet Species:</span>
                                                <span className="value">{selectedCustomer.petSpecies}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="label">Breed:</span>
                                                <span className="value">{selectedCustomer.petType}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="label">Size:</span>
                                                <span className="value">{selectedCustomer.petSize}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="label">Age:</span>
                                                <span className="value">1 year</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {modalContext === 'booking' && selectedCustomer.petName2 && (
                                <div className="customer-info-section">
                                    <h4>🐕 Second Pet Details</h4>
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <span className="label">Pet Name:</span>
                                            <span className="value">{selectedCustomer.petName2}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Pet Species:</span>
                                            <span className="value">{selectedCustomer.petSpecies2}</span>
                                        </div>
                                        {selectedCustomer.petSpecies2 === 'Dog' && (
                                            <>
                                                <div className="info-item">
                                                    <span className="label">Dog Breed:</span>
                                                    <span className="value">{selectedCustomer.petType2}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="label">Size:</span>
                                                    <span className="value">{selectedCustomer.petSize2}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="label">Age:</span>
                                                    <span className="value">1 year</span>
                                                </div>
                                            </>
                                        )}
                                        {selectedCustomer.petSpecies2 === 'Cat' && (
                                            <>
                                                <div className="info-item">
                                                    <span className="label">Cat Breed:</span>
                                                    <span className="value">{selectedCustomer.petType2}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="label">Size:</span>
                                                    <span className="value">{selectedCustomer.petSize2}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="label">Age:</span>
                                                    <span className="value">2 years</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}

                            {modalContext === 'customer' && (
                                <div className="customer-info-section">
                                    <h4>🆔 Identification</h4>
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <span className="label">Customer Submitted ID:</span>
                                            <span className="value">
                                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='60' viewBox='0 0 100 60'%3E%3Crect width='100' height='60' fill='%23f0f0f0' stroke='%23333' stroke-width='2'/%3E%3Ctext x='50' y='35' text-anchor='middle' font-family='Arial' font-size='12' fill='%23333'%3EID Card%3C/text%3E%3C/svg%3E" alt="Customer ID Card" style={{ width: '100px', height: '60px', border: '1px solid #ddd', borderRadius: '4px' }} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showCustomerForm && (
                <div className="customer-form-placeholder">
                    Customer Form Component
                </div>
            )}
        </div>
    );
};

const activeViewTitle = {
    overall: 'Overall Analytics',
    breeds: 'Breeds Analytics',
    overview: 'Analytics Overview',
    bookings: 'Booking Monitoring',
    customers: 'Customer List'
};

export default App;


