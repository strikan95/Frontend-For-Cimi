import React, { useEffect, useState } from 'react';
import {
  SearchBoxFeatureSuggestion,
  SearchBoxSuggestion,
} from '@mapbox/search-js-core';
import { Combobox } from '@headlessui/react';
import { getLocationDetails, getLocationSuggestions } from '@/app/actions';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

type MapBoxSearchProps = {
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (item: SearchBoxSuggestion) => void;
  onFeature?: (item: SearchBoxFeatureSuggestion) => void;
};

type MapBoxSearchState = {
  query: string;
  suggestions: SearchBoxSuggestion[];
  selected: SearchBoxSuggestion | null;
  feature: SearchBoxFeatureSuggestion | null;
  isClearing: boolean;
};

function MapBoxSearch({
  value,
  onChange,
  onSelect,
  onFeature,
}: MapBoxSearchProps) {
  const [state, setState] = useState<MapBoxSearchState>({
    query: value || '',
    suggestions: [],
    selected: null,
    feature: null,
    isClearing: false,
  });

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  function updateState(state: Partial<MapBoxSearchState>) {
    setState((prevState) => {
      return { ...prevState, ...state };
    });
  }

  useEffect(() => {
    const updateSuggestions = async (q: string) => {
      try {
        const suggestions = await getLocationSuggestions(q);
        updateState({ suggestions: suggestions });
      } catch (e) {
        console.error(e);
      }
    };

    if (!state.isClearing && state.query !== '') {
      updateSuggestions(state.query);
    }
  }, [state.query]);

  useEffect(() => {
    const updateFeature = async (id: string) => {
      try {
        const feature = await getLocationDetails(id);
        updateState({ feature: feature });
      } catch (e) {
        console.error(e);
      }
    };

    if (!state.isClearing && state.selected) {
      updateFeature(state.selected.mapbox_id);
      onSelect?.(state.selected);

      //Update query value to the formatted name
      onChange?.(state.selected.place_formatted);
    }
  }, [state.selected]);

  useEffect(() => {
    if (!state.isClearing && state.feature) {
      onFeature?.(state.feature);
    }
  }, [state.feature]);

  useEffect(() => {
    if (state.isClearing) updateState({ isClearing: false });
  }, [state.isClearing]);

  function onClear() {
    updateState({
      query: '',
      suggestions: [],
      selected: null,
      feature: null,
      isClearing: true,
    });

    if (inputRef.current) inputRef.current.focus();
  }

  return (
    <Combobox
      value={state.selected}
      onChange={(value) => updateState({ selected: value })}
      nullable
    >
      <div className={'relative w-full'}>
        <Combobox.Input
          onChange={(e) => updateState({ query: e.target.value })}
          displayValue={(suggestion: SearchBoxSuggestion) => {
            return suggestion ? suggestion.place_formatted : state.query;
          }}
          className={`w-full rounded-lg rounded-b-none border border-b-0 border-gray-300 p-4 shadow
            outline-none`}
          ref={inputRef as React.RefObject<HTMLInputElement> | null}
        />
        <button
          hidden={state.query === ''}
          className={'absolute inset-y-0 right-2'}
          onClick={onClear}
        >
          <X />
        </button>
      </div>
      <Combobox.Options
        className={`max-h-64 w-full overflow-y-scroll rounded-lg rounded-t-none border border-t-0
          border-gray-300 p-2`}
      >
        {state.suggestions.map((suggestion) => (
          <Combobox.Option
            className={({ active }: { active: boolean }) =>
              cn(
                'flex h-16 items-center rounded',
                active ? 'lg:bg-teal-600 lg:text-white' : 'lg:text-gray-900'
              )
            }
            key={suggestion.mapbox_id}
            value={suggestion}
          >
            {suggestion.place_formatted}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}

export default MapBoxSearch;
