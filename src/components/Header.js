import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import styled from 'styled-components';
const NotificationWrapper = styled.div`
  position: relative;
  margin-right: 20px;
`;

const BellIcon = styled.div`
  cursor: pointer;
  position: relative;
  color: #4a3aff;
  &:hover {
    color: #6f77ff;
  }
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 20px;
  font-weight: bold;
  padding: 8px;
  border-radius: 50%; 
`;

const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -10px;
  background: red;
  color: white;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 50%;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 25px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  width: 250px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const Notification = styled.div`
  padding: 10px;
  font-size: 14px;
  background: ${props => (props.read ? '#fff' : '#f1f1f1')};
  border-bottom: 1px solid #eee;
`;

const NoNotif = styled.div`
  padding: 10px;
  text-align: center;
  color: #888;
`;
const HeaderWrap = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background:rgb(246, 246, 246);
  color: white;
`;
const LogoSection = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const LogoImg = styled.img`
  height: 40px;
  margin-right: 10px;
`;
const LogoText = styled.span`
  font-size: 24px;
  font-weight: bold;
`;
const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: ${props => (props.primary ? '#ffffff' : 'transparent')};
  color: ${props => (props.primary ? '#4a3aff' : '#ffffff')};
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;  
  &:hover {
    background: ${props => (props.primary ? '#f0f0f0' : 'rgba(255,255,255,0.2)')};
  }
`;
// Sample notifications
const dummyNotifications = [
  { id: 1, message: 'John answered your question.', read: false },
  { id: 2, message: 'Alice commented on your answer.', read: false },
  { id: 3, message: '@you mentioned in a comment.', read: true },
];

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState(dummyNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);

    // Optional: mark all as read when opened
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  return (
    <HeaderWrap>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <LogoSection>
          <LogoImg src="/logo-s.png" alt="StackIt Logo" />
          <LogoText>StackIt</LogoText>
        </LogoSection>
      </Link>

      <Nav>
        <NotificationWrapper>
          <BellIcon onClick={toggleDropdown}>
            <FaBell size={20} />
            {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
          </BellIcon>
          {showDropdown && (
            <Dropdown>
              {notifications.map(n => (
                <Notification key={n.id} read={n.read}>
                  {n.message}
                </Notification>
              ))}
              {notifications.length === 0 && <NoNotif>No notifications</NoNotif>}
            </Dropdown>
          )}
        </NotificationWrapper>

        <Button primary>Ask Question</Button>
        <Button primary>Login</Button>
      </Nav>
    </HeaderWrap>
  );
};

export default Header;
