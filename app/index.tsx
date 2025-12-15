import React from 'react';
import { Box } from '@/components/ui/box';
import { ActivityIndicator } from 'react-native';

export default function IndexRedirect() {
  return (
    <Box className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" />
    </Box>
  );
}
