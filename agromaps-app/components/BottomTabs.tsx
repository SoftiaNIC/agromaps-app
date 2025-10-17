import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

interface TabItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route?: string;
  isMore?: boolean;
}

const tabs: TabItem[] = [
  { id: 'maps', label: 'Mapas', icon: 'map-outline', route: '/(tabs)/map' },
  { id: 'chatbot', label: 'Chatbot', icon: 'chatbubble-outline', route: '/(dashboard)/chatbot' },
  { id: 'library', label: 'Biblioteca', icon: 'library-outline', route: '/(tabs)/soilstudies' },
  { id: 'more', label: 'Más', icon: 'menu-outline', isMore: true },
];

export interface BottomTabsProps {
  activeTab?: string;
  onTabPress?: (tabId: string) => void;
}

export const BottomTabs: React.FC<BottomTabsProps> = ({
  activeTab = 'maps',
  onTabPress,
}) => {
  const [showMoreSheet, setShowMoreSheet] = useState(false);
  const [sheetAnimation] = useState(new Animated.Value(0));

  const handleTabPress = (tab: TabItem) => {
    if (tab.isMore) {
      toggleMoreSheet();
    } else if (tab.route) {
      router.push(tab.route as any);
      onTabPress?.(tab.id);
    }
  };

  const toggleMoreSheet = () => {
    if (showMoreSheet) {
      // Cerrar sheet
      Animated.timing(sheetAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowMoreSheet(false));
    } else {
      // Abrir sheet
      setShowMoreSheet(true);
      Animated.timing(sheetAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const sheetTranslateY = sheetAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const handleMoreOption = (option: string) => {
    setShowMoreSheet(false);
    
    switch (option) {
      case 'history':
        console.log('Ir a historial');
        break;
      case 'settings':
        console.log('Ir a configuración');
        break;
      case 'premium':
        console.log('Ir a premium');
        break;
      case 'help':
        console.log('Ir a ayuda');
        break;
      case 'theme':
        console.log('Cambiar tema');
        break;
      case 'language':
        console.log('Cambiar idioma');
        break;
    }
  };

  return (
    <>
      {/* Tabs Inferiores */}
      <View style={styles.container}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab,
            ]}
            onPress={() => handleTabPress(tab)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={tab.icon}
              size={24}
              color={activeTab === tab.id ? '#007bff' : '#666'}
            />
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.id && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Sheet de Más */}
      {showMoreSheet && (
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              transform: [{ translateY: sheetTranslateY }],
            },
          ]}
        >
          <View style={styles.sheetHeader}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Más Opciones</Text>
          </View>

          <View style={styles.sheetContent}>
            {/* Opciones principales */}
            <View style={styles.optionGroup}>
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => handleMoreOption('history')}
              >
                <Ionicons name="time-outline" size={24} color="#333" />
                <Text style={styles.optionText}>Historial</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => handleMoreOption('settings')}
              >
                <Ionicons name="settings-outline" size={24} color="#333" />
                <Text style={styles.optionText}>Configuración Avanzada</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => handleMoreOption('premium')}
              >
                <View style={styles.premiumIcon}>
                  <Ionicons name="star" size={20} color="#fff" />
                </View>
                <Text style={styles.optionText}>Conseguir Premium</Text>
                <View style={styles.premiumBadge}>
                  <Text style={styles.premiumBadgeText}>NUEVO</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => handleMoreOption('help')}
              >
                <Ionicons name="help-circle-outline" size={24} color="#333" />
                <Text style={styles.optionText}>Ayuda y Soporte</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
            </View>

            {/* Separador */}
            <View style={styles.separator} />

            {/* Sub-opciones de configuración */}
            <View style={styles.optionGroup}>
              <TouchableOpacity
                style={styles.subOptionItem}
                onPress={() => handleMoreOption('theme')}
              >
                <Ionicons name="moon-outline" size={20} color="#666" />
                <Text style={styles.subOptionText}>Cambiar Tema</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.subOptionItem}
                onPress={() => handleMoreOption('language')}
              >
                <Ionicons name="language-outline" size={20} color="#666" />
                <Text style={styles.subOptionText}>Cambiar Idioma</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}

      {/* Overlay para cerrar sheet */}
      {showMoreSheet && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => toggleMoreSheet()}
          activeOpacity={1}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingBottom: 8,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  activeTab: {
    // Estilos para tab activo si es necesario
  },
  tabLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#007bff',
    fontWeight: '600',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
  sheetHeader: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    marginBottom: 12,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  sheetContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  optionGroup: {
    marginBottom: 16,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
    flex: 1,
  },
  premiumIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffc107',
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumBadge: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  premiumBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginVertical: 8,
  },
  subOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  subOptionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
});

export default BottomTabs;
