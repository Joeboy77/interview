import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Image,
  SafeAreaView
} from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const Dashboard = () => {
  // Mock data for charts and statistics
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Monthly Sales"]
  };
  
  const categoryData = {
    labels: ["Clothing", "Electronics", "Home", "Beauty", "Sports"],
    datasets: [
      {
        data: [35, 28, 15, 12, 10]
      }
    ]
  };
  
  const pieData = [
    {
      name: "New",
      population: 45,
      color: "#FF8A65",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    },
    {
      name: "Processing",
      population: 28,
      color: "#4FC3F7",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    },
    {
      name: "Shipped",
      population: 15,
      color: "#AED581",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    },
    {
      name: "Delivered",
      population: 12,
      color: "#7986CB",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    }
  ];
  
  const recentOrders = [
    { id: '#ORD-5521', customer: 'Alex Johnson', amount: '$129.99', status: 'Delivered' },
    { id: '#ORD-5520', customer: 'Sarah Williams', amount: '$89.50', status: 'Processing' },
    { id: '#ORD-5519', customer: 'Michael Brown', amount: '$245.00', status: 'Shipped' },
    { id: '#ORD-5518', customer: 'Emily Davis', amount: '$67.25', status: 'New' },
  ];
  
  const topProducts = [
    { name: 'Wireless Headphones', sales: 245, image: 'https://placeholder.com/100' },
    { name: 'Smart Watch Series 5', sales: 190, image: 'https://placeholder.com/100' },
    { name: 'Designer T-shirt', sales: 175, image: 'https://placeholder.com/100' },
    { name: 'Premium Sneakers', sales: 162, image: 'https://placeholder.com/100' },
  ];

  // Chart configurations
  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(81, 150, 244, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    decimalPlaces: 0,
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return '#4CAF50';
      case 'Shipped': return '#2196F3';
      case 'Processing': return '#FF9800';
      case 'New': return '#F44336';
      default: return '#9E9E9E';
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerSubtitle}>Welcome back, Admin</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationText}>🔔</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={[styles.summaryCard, { backgroundColor: '#E3F2FD' }]}>
            <Text style={styles.summaryValue}>$12,543</Text>
            <Text style={styles.summaryLabel}>Total Revenue</Text>
            <Text style={styles.summaryChange}>↑ 8.2%</Text>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: '#E8F5E9' }]}>
            <Text style={styles.summaryValue}>1,285</Text>
            <Text style={styles.summaryLabel}>Total Orders</Text>
            <Text style={styles.summaryChange}>↑ 5.1%</Text>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: '#FFF3E0' }]}>
            <Text style={styles.summaryValue}>873</Text>
            <Text style={styles.summaryLabel}>Customers</Text>
            <Text style={styles.summaryChange}>↑ 12.3%</Text>
          </View>
        </View>
        
        {/* Sales Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Sales Overview</Text>
          <LineChart
            data={salesData}
            width={width - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>
        
        {/* Categories Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Sales by Category</Text>
          <BarChart
            data={categoryData}
            width={width - 40}
            height={220}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(255, 132, 0, ${opacity})`,
            }}
            style={styles.chart}
          />
        </View>
        
        {/* Orders Status */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Orders Status</Text>
          <PieChart
            data={pieData}
            width={width - 40}
            height={200}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
        
        {/* Recent Orders */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {recentOrders.map((order, index) => (
            <View key={index} style={styles.orderItem}>
              <View style={styles.orderDetails}>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.orderCustomer}>{order.customer}</Text>
              </View>
              <View style={styles.orderStatus}>
                <Text style={styles.orderAmount}>{order.amount}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>{order.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        
        {/* Top Products */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Products</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {topProducts.map((product, index) => (
            <View key={index} style={styles.productItem}>
              <View style={styles.productImagePlaceholder}>
                <Text style={styles.productImageText}>📦</Text>
              </View>
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productSales}>{product.sales} sold</Text>
              </View>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navIcon, styles.activeNavIcon]}>🏠</Text>
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📊</Text>
          <Text style={styles.navText}>Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🛒</Text>
          <Text style={styles.navText}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    width: (width - 50) / 3,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 5,
  },
  summaryChange: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 5,
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 10,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#5196F4',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  orderDetails: {
    flex: 1,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  orderCustomer: {
    fontSize: 13,
    color: '#757575',
    marginTop: 4,
  },
  orderStatus: {
    alignItems: 'flex-end',
  },
  orderAmount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  productImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  productImageText: {
    fontSize: 24,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  productSales: {
    fontSize: 13,
    color: '#757575',
    marginTop: 4,
  },
  viewButton: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    backgroundColor: '#5196F420',
    borderRadius: 8,
  },
  viewButtonText: {
    fontSize: 12,
    color: '#5196F4',
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 20,
    color: '#9E9E9E',
    marginBottom: 4,
  },
  activeNavIcon: {
    color: '#5196F4',
  },
  navText: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  activeNavText: {
    color: '#5196F4',
    fontWeight: '500',
  },
});

export default Dashboard;