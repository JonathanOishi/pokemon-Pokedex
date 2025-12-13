import React from 'react';
import { Box } from '@/components/ui/box';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Search } from 'lucide-react-native';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

export default function SearchBar({ value, onChangeText, placeholder = 'Search Pokemon, move, ability...' }: SearchBarProps) {
    return (
        <Box className="mb-4">
            <Input
                variant="outline"
                size="lg"
                className="bg-background-0 rounded-xl border-outline-200"
            >
                <InputSlot className="pl-3">
                    <InputIcon as={Search} className="text-typography-400" />
                </InputSlot>
                <InputField
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    className="text-typography-900"
                />
            </Input>
        </Box>
    );
}
