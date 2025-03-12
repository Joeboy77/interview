import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Signup({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSignup = () => {
    console.log('Signup attempted with:', { fullName, email, password, confirmPassword, agreeToTerms });
    navigation.navigate('Login')
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <LinearGradient
            colors={['#f5f7fa', '#e4e9f2']}
            style={styles.container}
          >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.logoContainer}>
                <Image
                  source={{ uri: 'https://via.placeholder.com/150' }}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <Text style={styles.appName}>Interview</Text>
              </View>

              <View style={styles.formContainer}>
                <Text style={styles.welcomeText}>Create Account</Text>
                <Text style={styles.subText}>Sign up to get started</Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Full Name</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="John Doe"
                      value={fullName}
                      onChangeText={setFullName}
                      autoCapitalize="words"
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="your.email@example.com"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={[styles.input, styles.passwordInput]}
                      placeholder="Create a password"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!isPasswordVisible}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      <Text>{isPasswordVisible ? '👁️' : '👁️‍🗨️'}</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.passwordHint}>
                    Password must be at least 8 characters
                  </Text>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={[styles.input, styles.passwordInput]}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!isConfirmPasswordVisible}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                    >
                      <Text>{isConfirmPasswordVisible ? '👁️' : '👁️‍🗨️'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.termsContainer}>
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => setAgreeToTerms(!agreeToTerms)}
                  >
                    <View style={[
                      styles.checkboxInner,
                      agreeToTerms && styles.checkboxChecked
                    ]}>
                      {agreeToTerms && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.termsText}>
                    I agree to the{' '}
                    <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                    <Text style={styles.termsLink}>Privacy Policy</Text>
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.signupButton,
                    !agreeToTerms && styles.signupButtonDisabled
                  ]}
                  onPress={handleSignup}
                  disabled={!agreeToTerms}
                >
                  <LinearGradient
                    colors={agreeToTerms ? ['#4a69bd', '#1e3799'] : ['#a0a0a0', '#808080']}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.signupButtonText}>Create Account</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>OR</Text>
                  <View style={styles.dividerLine} />
                </View>

                <View style={styles.socialContainer}>
                  <TouchableOpacity style={styles.socialButton}>
                    <View style={styles.socialIconContainer}>
                      <Text style={styles.socialIcon}>G</Text>
                    </View>
                    <Text style={styles.socialText}>Sign up with Google</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.socialButton}>
                    <View style={styles.socialIconContainer}>
                      <Text style={styles.socialIcon}>f</Text>
                    </View>
                    <Text style={styles.socialText}>Sign up with Facebook</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>Already have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginLink}>Sign In</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </LinearGradient>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowHeight * 0.03,
  },
  logo: {
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    maxWidth: 100,
    maxHeight: 100,
    borderRadius: 50,
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#1e3799',
  },
  formContainer: {
    width: windowWidth > 500 ? 500 : windowWidth * 0.9,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  passwordHint: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    marginLeft: 5,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxInner: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#4a69bd',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4a69bd',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  termsLink: {
    color: '#4a69bd',
    fontWeight: '500',
  },
  signupButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 5,
  },
  signupButtonDisabled: {
    opacity: 0.7,
  },
  gradient: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e1e1e1',
  },
  dividerText: {
    paddingHorizontal: 15,
    color: '#666',
    fontSize: 14,
  },
  socialContainer: {
    marginBottom: 15,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  socialIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  socialIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  socialText: {
    fontSize: 16,
    color: '#333',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  loginText: {
    fontSize: 16,
    color: '#666',
  },
  loginLink: {
    fontSize: 16,
    color: '#4a69bd',
    fontWeight: '600',
  },
});