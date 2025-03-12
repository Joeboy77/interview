import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView
} from 'react-native';

const { width } = Dimensions.get('window');

// Simple custom chart components
const SimpleBarChart = ({ data, labels, color }) => {
  const maxValue = Math.max(...data);
  
  return (
    <View style={styles.customChartContainer}>
      <View style={styles.barsContainer}>
        {data.map((value, index) => (
          <View key={index} style={styles.barWrapper}>
            <View 
              style={[
                styles.bar, 
                { 
                  height: (value / maxValue) * 150,
                  backgroundColor: color || '#FF8400'
                }
              ]}
            >
              <Text style={styles.barValue}>{value}</Text>
            </View>
            <Text style={styles.barLabel}>{labels[index]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const SimpleLineChart = ({ data, labels, color }) => {
  return (
    <View style={styles.customChartContainer}>
      <View style={styles.lineChartContainer}>
        {/* Display data points as circles with values */}
        {data.map((value, index) => (
          <View key={index} style={styles.dataPointColumn}>
            <Text style={styles.dataPointValue}>{value}</Text>
            <View 
              style={[
                styles.dataPoint, 
                { backgroundColor: color || '#5196F4' }
              ]} 
            />
            <Text style={styles.dataPointLabel}>{labels[index]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const SimplePieChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <View style={styles.pieChartContainer}>
      <View style={styles.pieChartLegend}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>
              {item.name}: {item.value}% ({Math.round(item.value / total * 100)}%)
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const Dashboard = () => {
  // Mock data for charts and statistics
  const salesData = [20, 45, 28, 80, 99, 43];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  
  // Bar chart data
  const categoryData = [35, 28, 15, 12, 10];
  const categories = ["Clothing", "Electronics", "Home", "Beauty", "Sports"];
  
  // Pie chart data
  const pieData = [
    { name: 'New', value: 45, color: '#FF8A65' },
    { name: 'Processing', value: 28, color: '#4FC3F7' },
    { name: 'Shipped', value: 15, color: '#AED581' },
    { name: 'Delivered', value: 12, color: '#7986CB' }
  ];
  
  const recentOrders = [
    { id: '#ORD-5521', customer: 'Alex Johnson', amount: '$129.99', status: 'Delivered' },
    { id: '#ORD-5520', customer: 'Sarah Williams', amount: '$89.50', status: 'Processing' },
    { id: '#ORD-5519', customer: 'Michael Brown', amount: '$245.00', status: 'Shipped' },
    { id: '#ORD-5518', customer: 'Emily Davis', amount: '$67.25', status: 'New' },
  ];
  
  const topProducts = [
    { name: 'Wireless Headphones', sales: 245 },
    { name: 'Smart Watch Series 5', sales: 190 },
    { name: 'Designer T-shirt', sales: 175 },
    { name: 'Premium Sneakers', sales: 162 },
  ];

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
          <SimpleLineChart 
            data={salesData} 
            labels={months}
            color="#5196F4"
          />
        </View>
        
        {/* Categories Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Sales by Category</Text>
          <SimpleBarChart 
            data={categoryData} 
            labels={categories}
            color="#FF8400"
          />
        </View>
        
        {/* Orders Status */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Orders Status</Text>
          <SimplePieChart data={pieData} />
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
      {/* <View style={styles.bottomNav}>
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
      </View> */}
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
  // Custom chart styles
  customChartContainer: {
    marginVertical: 10,
    height: 200,
  },
  // Bar chart styles
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 170,
    paddingBottom: 20,
  },
  barWrapper: {
    alignItems: 'center',
    width: (width - 80) / 5,
  },
  bar: {
    width: 20,
    minHeight: 5,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  barValue: {
    fontSize: 10,
    color: '#333',
    marginTop: -16,
  },
  barLabel: {
    fontSize: 10,
    color: '#757575',
    marginTop: 5,
    textAlign: 'center',
  },
  // Line chart styles
  lineChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 170,
    paddingBottom: 20,
  },
  dataPointColumn: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
  },
  dataPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  dataPointValue: {
    fontSize: 10,
    color: '#333',
    marginBottom: 3,
  },
  dataPointLabel: {
    fontSize: 10,
    color: '#757575',
    marginTop: 5,
  },
  // Pie chart styles
  pieChartContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  pieChartLegend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  legendColor: {
    width: 15,
    height: 15,
    borderRadius: 8,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#757575',
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