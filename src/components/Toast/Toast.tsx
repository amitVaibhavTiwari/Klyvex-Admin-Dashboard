import React from 'react';
import { Box, Typography, IconButton, Slide } from '@mui/material';
import {
  FiCheckCircle,
  FiX,
  FiAlertTriangle,
  FiInfo,
  FiXCircle
} from 'react-icons/fi';
import { toast as hotToast, Toast } from 'react-hot-toast';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface CustomToastProps {
  toast: Toast;
  variant?: ToastVariant;
  message: string;
  title?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({
  toast,
  variant = 'success',
  message,
  title,
  showCloseButton = true,
  onClose
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: '#034300',
          borderColor: '#10b981',
          iconColor: '#10b981',
          titleColor: '#ffffff',
          messageColor: '#a3a3a3'
        };
      case 'error':
        return {
          backgroundColor: '#2e1a1a',
          borderColor: '#ef4444',
          iconColor: '#ef4444',
          titleColor: '#ffffff',
          messageColor: '#a3a3a3'
        };
      case 'warning':
        return {
          backgroundColor: '#2e2a1a',
          borderColor: '#f59e0b',
          iconColor: '#f59e0b',
          titleColor: '#ffffff',
          messageColor: '#a3a3a3'
        };
      case 'info':
        return {
          backgroundColor: '#1a1f2e',
          borderColor: '#3b82f6',
          iconColor: '#3b82f6',
          titleColor: '#ffffff',
          messageColor: '#a3a3a3'
        };
      default:
        return {
          backgroundColor: '#1a2e1a',
          borderColor: '#10b981',
          iconColor: '#10b981',
          titleColor: '#ffffff',
          messageColor: '#a3a3a3'
        };
    }
  };

  const getIcon = () => {
    const styles = getVariantStyles();
    const iconProps = { size: 20, color: styles.iconColor };

    switch (variant) {
      case 'success':
        return <FiCheckCircle {...iconProps} />;
      case 'error':
        return <FiXCircle {...iconProps} />;
      case 'warning':
        return <FiAlertTriangle {...iconProps} />;
      case 'info':
        return <FiInfo {...iconProps} />;
      default:
        return <FiCheckCircle {...iconProps} />;
    }
  };

  const handleClose = () => {
    hotToast.dismiss(toast.id);
    onClose?.();
  };

  const styles = getVariantStyles();

  return (
    <Slide
      direction="down"
      in={toast.visible}
      mountOnEnter
      unmountOnExit
      timeout={300}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2.5,
          p: 3,
          minWidth: 360,
          maxWidth: 420,
          backgroundColor: styles.backgroundColor,
          border: `1px solid ${styles.borderColor}`,
          borderRadius: 2,
          position: 'relative'
        }}
      >
        {/* Icon */}
        <Box sx={{ mt: 0.5 }}>
          {getIcon()}
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {title && (
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: styles.titleColor,
                mb: 0.5,
                fontSize: '1rem'
              }}
            >
              {title}
            </Typography>
          )}
          <Typography
            variant="body2"
            sx={{
              color: styles.messageColor,
              wordBreak: 'break-word',
              fontSize: '0.875rem',
              lineHeight: 1.5
            }}
          >
            {message}
          </Typography>
        </Box>

        {/* Close Button */}
        {showCloseButton && (
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{
              color: styles.messageColor,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: styles.titleColor
              }
            }}
          >
            <FiX size={16} />
          </IconButton>
        )}
      </Box>
    </Slide>
  );
};

export default CustomToast;