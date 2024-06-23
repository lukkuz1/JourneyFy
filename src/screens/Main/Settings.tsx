import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

// Define your SVG XML for the logout icon
const logout_icon_xml = `
  <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.2765 18.8954H21.1947C21.0526 18.8954 20.9193 18.9564 20.8305 19.064C20.6232 19.3111 20.4011 19.5494 20.1671 19.7762C19.2103 20.7164 18.077 21.4657 16.8297 21.9826C15.5376 22.5183 14.1488 22.7932 12.7461 22.7907C11.3276 22.7907 9.9536 22.5174 8.66247 21.9826C7.41525 21.4657 6.2819 20.7164 5.32508 19.7762C4.36655 18.8391 3.60225 17.7285 3.07449 16.5058C2.52665 15.2384 2.25125 13.8925 2.25125 12.5C2.25125 11.1076 2.52961 9.76166 3.07449 8.49422C3.6016 7.27038 4.3597 6.16864 5.32508 5.22387C6.29047 4.27911 7.4128 3.53492 8.66247 3.01748C9.9536 2.4826 11.3276 2.20934 12.7461 2.20934C14.1646 2.20934 15.5386 2.47969 16.8297 3.01748C18.0794 3.53492 19.2018 4.27911 20.1671 5.22387C20.4011 5.45352 20.6202 5.69189 20.8305 5.93608C20.9193 6.04364 21.0555 6.10468 21.1947 6.10468H23.2765C23.4631 6.10468 23.5786 5.9012 23.4749 5.74713C21.2036 2.28202 17.2295 -0.0115839 12.7135 4.40077e-05C5.61825 0.0174858 -0.0704125 5.67155 0.000658755 12.6279C0.07173 19.4738 5.75151 25 12.7461 25C17.2503 25 21.2066 22.7093 23.4749 19.2529C23.5756 19.0988 23.4631 18.8954 23.2765 18.8954ZM25.9091 12.3169L21.707 9.06108C21.5501 8.93898 21.322 9.04945 21.322 9.24421V11.4535H12.0236C11.8933 11.4535 11.7866 11.5582 11.7866 11.6861V13.314C11.7866 13.4419 11.8933 13.5465 12.0236 13.5465H21.322V15.7558C21.322 15.9506 21.553 16.0611 21.707 15.939L25.9091 12.6832C25.9374 12.6614 25.9603 12.6336 25.9761 12.6019C25.9918 12.5702 26 12.5353 26 12.5C26 12.4647 25.9918 12.4299 25.9761 12.3982C25.9603 12.3664 25.9374 12.3386 25.9091 12.3169Z" fill="#FF0000"/>
</svg>

`;

export default function Settings() {
  const navigation = useNavigation();

  const handleLogoutPress = () => {
    
  };

  return (
    <View style={styles.container}>
      <Text>Nustatymų ekranas</Text>
      
      {/* Logout button */}
      <Pressable onPress={handleLogoutPress} style={styles.logoutButton}>
        <SvgXml xml={logout_icon_xml} width={24} height={24} />
        <Text style={styles.logoutButtonText}>Atsijungti</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
});