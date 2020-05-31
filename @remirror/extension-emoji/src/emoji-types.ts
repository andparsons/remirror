import { CustomHandler, Handler } from '@remirror/core';
import {
  SuggestChangeHandlerParameter,
  SuggestExitHandlerParameter,
  SuggestKeyBindingMap,
} from '@remirror/pm/suggest';

import AliasData from './data/aliases';
import CategoryData from './data/categories';
import EmojiData from './data/emojis';

export type Names = keyof typeof EmojiData;
export type AliasNames = keyof typeof AliasData;
export type Category = keyof typeof CategoryData;
export type NamesAndAliases = Names | AliasNames;

export interface EmojiObject {
  keywords: string[];
  char: string;
  category: string;
  name: string;
  description: string;
  skinVariations: boolean;
}

export interface EmojiSuggestionChangeHandlerParameter
  extends SuggestChangeHandlerParameter<EmojiSuggestCommand> {
  /**
   * The currently matching objects
   */
  emojiMatches: EmojiObject[];
}

export type SkinVariation = 0 | 1 | 2 | 3 | 4;

export type EmojiSuggestCommand = (emoji: EmojiObject, skinVariation?: SkinVariation) => void;
export type EmojiSuggestionKeyBindings = SuggestKeyBindingMap<EmojiSuggestCommand>;
export type EmojiSuggestionChangeHandler = (
  parameter: EmojiSuggestionChangeHandlerParameter,
) => void;
export type EmojiSuggestionExitHandler = (parameter: SuggestExitHandlerParameter) => void;

export interface EmojiOptions {
  /**
   * The character which will trigger the emoji suggesters popup.
   */
  suggestionCharacter?: string;

  /**
   * A list of the initial (frequently used) emoji displayed to the user.
   * These are used when the query typed is less than two characters long.
   */
  defaultEmoji?: NamesAndAliases[];

  /**
   * Key bindings for suggesters.
   */
  suggestionKeyBindings?: CustomHandler<EmojiSuggestionKeyBindings>;

  /**
   * Called whenever the suggestion value is updated.
   */
  onSuggestionChange?: Handler<EmojiSuggestionChangeHandler>;

  /**
   * Called when the suggestion exits.
   * This is useful for cleaning up local state when emoji is set.
   */
  onSuggestionExit?: Handler<EmojiSuggestionExitHandler>;

  /**
   * The maximum results to show when searching for matching emoji.
   *
   * @defaultValue 15
   */
  maxResults?: number;
}

export type EmojiObjectRecord = Record<Names, EmojiObject>;
