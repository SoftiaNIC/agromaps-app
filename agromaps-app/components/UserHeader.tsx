import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUserHeader } from '../hooks/useUserHeader';

export interface UserHeaderProps {
  showLogout?: boolean;
  showEmail?: boolean;
  style?: any;
  onLogoutSuccess?: () => void;
}

/**
 * Componente reutilizable para mostrar información del usuario y botón de logout
 */
export const UserHeader: React.FC<UserHeaderProps> = ({
  showLogout = true,
  showEmail = false,
  style,
  onLogoutSuccess,
}) => {
  const {
    userName,
    userEmail,
    isLoading,
    isLoggingOut,
    error,
    handleLogout,
    clearError,
  } = useUserHeader();

  // Mostrar loading si está cargando
  if (isLoading) {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#007bff" />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      </View>
    );
  }

  // No mostrar nada si no hay usuario
  if (!userName) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.userInfo}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={40} color="#007bff" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.userName} numberOfLines={1}>
            {userName}
          </Text>
          {showEmail && userEmail && (
            <Text style={styles.userEmail} numberOfLines={1}>
              {userEmail}
            </Text>
          )}
        </View>
      </View>

      {showLogout && (
        <TouchableOpacity
          style={[styles.logoutButton, isLoggingOut && styles.logoutButtonDisabled]}
          onPress={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Ionicons name="log-out-outline" size={16} color="#fff" />
              <Text style={styles.logoutText}>Salir</Text>
            </>
          )}
        </TouchableOpacity>
      )}

      {/* Mostrar error si existe */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={clearError} style={styles.errorCloseButton}>
            <Ionicons name="close" size={16} color="#ff4444" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 20,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc3545',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 12,
  },
  logoutButtonDisabled: {
    backgroundColor: '#6c757d',
    opacity: 0.7,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  errorContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    color: '#721c24',
    fontSize: 12,
    flex: 1,
  },
  errorCloseButton: {
    marginLeft: 8,
    padding: 2,
  },
});

export default UserHeader;
