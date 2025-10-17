import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import TopNavbar from './TopNavbar';
import BottomTabs from './BottomTabs';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  showBottomTabs?: boolean;
  showTopNavbar?: boolean;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeTab = 'maps',
  showBottomTabs = true,
  showTopNavbar = true,
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabPress = (tabId: string) => {
    setCurrentTab(tabId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Top Navbar */}
        {showTopNavbar && <TopNavbar />}

        {/* Main Content */}
        <View style={styles.content}>
          {children}
        </View>

        {/* Bottom Tabs */}
        {showBottomTabs && (
          <BottomTabs
            activeTab={currentTab}
            onTabPress={handleTabPress}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default DashboardLayout;
