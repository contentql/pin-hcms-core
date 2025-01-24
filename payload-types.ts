/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    pages: Page;
    blogs: Blog;
    tags: Tag;
    media: Media;
    users: User;
    forms: Form;
    'form-submissions': FormSubmission;
    search: Search;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    pages: PagesSelect<false> | PagesSelect<true>;
    blogs: BlogsSelect<false> | BlogsSelect<true>;
    tags: TagsSelect<false> | TagsSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    forms: FormsSelect<false> | FormsSelect<true>;
    'form-submissions': FormSubmissionsSelect<false> | FormSubmissionsSelect<true>;
    search: SearchSelect<false> | SearchSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    'site-settings': SiteSetting;
  };
  globalsSelect: {
    'site-settings': SiteSettingsSelect<false> | SiteSettingsSelect<true>;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: string;
  title: string;
  layout?: (HomeType | DetailsType | ListType | FormType | DisqusCommentsType)[] | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (string | null) | Media;
  };
  isHome?: boolean | null;
  isDynamic?: boolean | null;
  slugMode?: ('generate' | 'custom') | null;
  /**
   * Contains only lowercase letters, numbers, and dashes.
   */
  slug?: string | null;
  pathMode?: ('generate' | 'custom') | null;
  path?: string | null;
  parent?: (string | null) | Page;
  breadcrumbs?:
    | {
        doc?: (string | null) | Page;
        url?: string | null;
        label?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "HomeType".
 */
export interface HomeType {
  heading?: string | null;
  subHeading?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'Home';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "DetailsType".
 */
export interface DetailsType {
  collectionSlug?: ('blogs' | 'tags' | 'users') | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'Details';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ListType".
 */
export interface ListType {
  title?: string | null;
  collectionSlug?: ('blogs' | 'tags' | 'users') | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'List';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FormType".
 */
export interface FormType {
  title: string;
  form: {
    relationTo: 'forms';
    value: string | Form;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: 'FormBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "forms".
 */
export interface Form {
  id: string;
  title: string;
  fields?:
    | (
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            defaultValue?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'checkbox';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'country';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'email';
          }
        | {
            message?:
              | {
                  [k: string]: unknown;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'message';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'number';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            options?:
              | {
                  label: string;
                  value: string;
                  id?: string | null;
                }[]
              | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'select';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'text';
          }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'textarea';
          }
        | {
            name: string;
            label?: string | null;
            /**
             * Enter the maximum size of each file in MB
             */
            size: number;
            width?: number | null;
            /**
             * Check this box if you want to allow multiple attachments
             */
            multiple: boolean;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'upload';
          }
      )[]
    | null;
  submitButtonLabel?: string | null;
  /**
   * Choose whether to display an on-page message or redirect to a different page after they submit the form.
   */
  confirmationType?: ('message' | 'redirect') | null;
  confirmationMessage?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  redirect?: {
    url: string;
  };
  /**
   * Send custom emails when the form submits. Use comma separated lists to send the same email to multiple recipients. To reference a value from this form, wrap that field's name with double curly brackets, i.e. {{firstName}}. You can use a wildcard {{*}} to output all data and {{*:table}} to format it as an HTML table in the email.
   */
  emails?:
    | {
        emailTo?: string | null;
        cc?: string | null;
        bcc?: string | null;
        replyTo?: string | null;
        emailFrom?: string | null;
        subject: string;
        /**
         * Enter the message that should be sent in this email.
         */
        message?:
          | {
              [k: string]: unknown;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "DisqusCommentsType".
 */
export interface DisqusCommentsType {
  title?: string | null;
  /**
   * To find your Disqus shortname, log into Disqus, access the Admin panel, and check the URL or General Site Settings.
   */
  shortName: string;
  id?: string | null;
  blockName?: string | null;
  blockType: 'DisqusComments';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    blogImageSize2?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    blogImageSize3?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blogs".
 */
export interface Blog {
  id: string;
  /**
   * Upload blog image
   */
  blogImage: string | Media;
  title: string;
  /**
   * Add the summary of the blog post
   */
  description: string;
  tags?:
    | {
        relationTo: 'tags';
        value: string | Tag;
      }[]
    | null;
  author?:
    | {
        relationTo: 'users';
        value: string | User;
      }[]
    | null;
  /**
   * Main content of the blog post. Use the rich text editor for formatting.
   */
  content: {
    [k: string]: unknown;
  }[];
  meta?: {
    title?: string | null;
    description?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (string | null) | Media;
  };
  /**
   * Contains only lowercase letters, numbers, and dashes.
   */
  slug?: string | null;
  /**
   * Save it as draft to schedule.
   */
  publishOn?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tags".
 */
export interface Tag {
  id: string;
  /**
   * Upload tag image
   */
  tagImage: string | Media;
  title: string;
  description: string;
  color?: ('blue' | 'gray' | 'red' | 'green' | 'yellow' | 'indigo' | 'purple' | 'pink') | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (string | null) | Media;
  };
  /**
   * Contains only lowercase letters, numbers, and dashes.
   */
  slug?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  displayName?: string | null;
  /**
   * Contains only lowercase letters, numbers, and dashes.
   */
  username: string;
  imageUrl?: (string | null) | Media;
  role: ('admin' | 'author' | 'user')[];
  emailVerified?: string | null;
  socialLinks?:
    | {
        platform:
          | 'website'
          | 'facebook'
          | 'instagram'
          | 'twitter'
          | 'linkedin'
          | 'youtube'
          | 'tiktok'
          | 'pinterest'
          | 'snapchat'
          | 'reddit'
          | 'tumblr'
          | 'whatsapp'
          | 'telegram'
          | 'github'
          | 'medium'
          | 'quora'
          | 'discord';
        value: string;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "form-submissions".
 */
export interface FormSubmission {
  id: string;
  form: string | Form;
  submissionData?:
    | {
        field: string;
        value: string;
        file?: (string | Media)[] | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This is a collection of automatically created search results. These results are used by the global site search and will be updated automatically as documents in the CMS are created or updated.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "search".
 */
export interface Search {
  id: string;
  title?: string | null;
  priority?: number | null;
  doc:
    | {
        relationTo: 'blogs';
        value: string | Blog;
      }
    | {
        relationTo: 'tags';
        value: string | Tag;
      }
    | {
        relationTo: 'users';
        value: string | User;
      };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'pages';
        value: string | Page;
      } | null)
    | ({
        relationTo: 'blogs';
        value: string | Blog;
      } | null)
    | ({
        relationTo: 'tags';
        value: string | Tag;
      } | null)
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null)
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'forms';
        value: string | Form;
      } | null)
    | ({
        relationTo: 'form-submissions';
        value: string | FormSubmission;
      } | null)
    | ({
        relationTo: 'search';
        value: string | Search;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  title?: T;
  layout?:
    | T
    | {
        Home?: T | HomeTypeSelect<T>;
        Details?: T | DetailsTypeSelect<T>;
        List?: T | ListTypeSelect<T>;
        FormBlock?: T | FormTypeSelect<T>;
        DisqusComments?: T | DisqusCommentsTypeSelect<T>;
      };
  meta?:
    | T
    | {
        title?: T;
        description?: T;
        image?: T;
      };
  isHome?: T;
  isDynamic?: T;
  slugMode?: T;
  slug?: T;
  pathMode?: T;
  path?: T;
  parent?: T;
  breadcrumbs?:
    | T
    | {
        doc?: T;
        url?: T;
        label?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "HomeType_select".
 */
export interface HomeTypeSelect<T extends boolean = true> {
  heading?: T;
  subHeading?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "DetailsType_select".
 */
export interface DetailsTypeSelect<T extends boolean = true> {
  collectionSlug?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ListType_select".
 */
export interface ListTypeSelect<T extends boolean = true> {
  title?: T;
  collectionSlug?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FormType_select".
 */
export interface FormTypeSelect<T extends boolean = true> {
  title?: T;
  form?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "DisqusCommentsType_select".
 */
export interface DisqusCommentsTypeSelect<T extends boolean = true> {
  title?: T;
  shortName?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blogs_select".
 */
export interface BlogsSelect<T extends boolean = true> {
  blogImage?: T;
  title?: T;
  description?: T;
  tags?: T;
  author?: T;
  content?: T;
  meta?:
    | T
    | {
        title?: T;
        description?: T;
        image?: T;
      };
  slug?: T;
  publishOn?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tags_select".
 */
export interface TagsSelect<T extends boolean = true> {
  tagImage?: T;
  title?: T;
  description?: T;
  color?: T;
  meta?:
    | T
    | {
        title?: T;
        description?: T;
        image?: T;
      };
  slug?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
  sizes?:
    | T
    | {
        thumbnail?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        blogImageSize2?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        blogImageSize3?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  displayName?: T;
  username?: T;
  imageUrl?: T;
  role?: T;
  emailVerified?: T;
  socialLinks?:
    | T
    | {
        platform?: T;
        value?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  _verified?: T;
  _verificationToken?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "forms_select".
 */
export interface FormsSelect<T extends boolean = true> {
  title?: T;
  fields?:
    | T
    | {
        checkbox?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              required?: T;
              defaultValue?: T;
              id?: T;
              blockName?: T;
            };
        country?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              required?: T;
              id?: T;
              blockName?: T;
            };
        email?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              required?: T;
              id?: T;
              blockName?: T;
            };
        message?:
          | T
          | {
              message?: T;
              id?: T;
              blockName?: T;
            };
        number?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              defaultValue?: T;
              required?: T;
              id?: T;
              blockName?: T;
            };
        select?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              defaultValue?: T;
              options?:
                | T
                | {
                    label?: T;
                    value?: T;
                    id?: T;
                  };
              required?: T;
              id?: T;
              blockName?: T;
            };
        text?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              defaultValue?: T;
              required?: T;
              id?: T;
              blockName?: T;
            };
        textarea?:
          | T
          | {
              name?: T;
              label?: T;
              width?: T;
              defaultValue?: T;
              required?: T;
              id?: T;
              blockName?: T;
            };
        upload?:
          | T
          | {
              name?: T;
              label?: T;
              size?: T;
              width?: T;
              multiple?: T;
              required?: T;
              id?: T;
              blockName?: T;
            };
      };
  submitButtonLabel?: T;
  confirmationType?: T;
  confirmationMessage?: T;
  redirect?:
    | T
    | {
        url?: T;
      };
  emails?:
    | T
    | {
        emailTo?: T;
        cc?: T;
        bcc?: T;
        replyTo?: T;
        emailFrom?: T;
        subject?: T;
        message?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "form-submissions_select".
 */
export interface FormSubmissionsSelect<T extends boolean = true> {
  form?: T;
  submissionData?:
    | T
    | {
        field?: T;
        value?: T;
        file?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "search_select".
 */
export interface SearchSelect<T extends boolean = true> {
  title?: T;
  priority?: T;
  doc?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "site-settings".
 */
export interface SiteSetting {
  id: string;
  general: {
    title: string;
    description: string;
    /**
     * We recommend a maximum size of 256 * 256 pixels
     */
    faviconUrl: string | Media;
    /**
     * We recommend a maximum size of 1200 * 630 pixels
     */
    ogImageUrl: string | Media;
    keywords?: string[] | null;
    /**
     * This field is used to format currency values & used as default currency for ecommerce-theme
     */
    currency:
      | 'usd'
      | 'eur'
      | 'inr'
      | 'gbp'
      | 'jpy'
      | 'cad'
      | 'aud'
      | 'chf'
      | 'cny'
      | 'hkd'
      | 'sgd'
      | 'mxn'
      | 'brl'
      | 'rub'
      | 'krw'
      | 'zar'
      | 'try'
      | 'sar'
      | 'aed'
      | 'pln';
  };
  navbar: {
    logo: BrandLogo;
    menuLinks?:
      | {
          /**
           * Check to create group of links
           */
          group?: boolean | null;
          menuLink?: {
            type?: ('reference' | 'custom') | null;
            newTab?: boolean | null;
            /**
             * Upload an svg or logo to be displayed with link
             */
            icon?: (string | null) | Media;
            label: string;
            page?: {
              relationTo: 'pages';
              value: string | Page;
            } | null;
            url?: string | null;
            id?: string | null;
          };
          menuLinkGroup?: {
            groupTitle: string;
            groupLinks?:
              | {
                  type?: ('reference' | 'custom') | null;
                  newTab?: boolean | null;
                  /**
                   * Upload an svg or logo to be displayed with link
                   */
                  icon?: (string | null) | Media;
                  label: string;
                  page?: {
                    relationTo: 'pages';
                    value: string | Page;
                  } | null;
                  url?: string | null;
                  id?: string | null;
                }[]
              | null;
          };
          id?: string | null;
        }[]
      | null;
  };
  footer: {
    logo: BrandLogo;
    footerLinks?:
      | {
          /**
           * Check to create group of links
           */
          group?: boolean | null;
          menuLink?: {
            type?: ('reference' | 'custom') | null;
            newTab?: boolean | null;
            /**
             * Upload an svg or logo to be displayed with link
             */
            icon?: (string | null) | Media;
            label: string;
            page?: {
              relationTo: 'pages';
              value: string | Page;
            } | null;
            url?: string | null;
            id?: string | null;
          };
          menuLinkGroup?: {
            groupTitle: string;
            groupLinks?:
              | {
                  type?: ('reference' | 'custom') | null;
                  newTab?: boolean | null;
                  /**
                   * Upload an svg or logo to be displayed with link
                   */
                  icon?: (string | null) | Media;
                  label: string;
                  page?: {
                    relationTo: 'pages';
                    value: string | Page;
                  } | null;
                  url?: string | null;
                  id?: string | null;
                }[]
              | null;
          };
          id?: string | null;
        }[]
      | null;
    socialLinks?:
      | {
          platform:
            | 'website'
            | 'facebook'
            | 'instagram'
            | 'twitter'
            | 'linkedin'
            | 'youtube'
            | 'tiktok'
            | 'pinterest'
            | 'snapchat'
            | 'reddit'
            | 'tumblr'
            | 'whatsapp'
            | 'telegram'
            | 'github'
            | 'medium'
            | 'quora'
            | 'discord';
          value: string;
          id?: string | null;
        }[]
      | null;
    copyright?: string | null;
  };
  redirectionLinks?: {
    /**
     * This redirects to a blog details page
     */
    blogLink?: {
      relationTo: 'pages';
      value: string | Page;
    } | null;
    /**
     * This redirect to a product details page
     */
    productLink?: {
      relationTo: 'pages';
      value: string | Page;
    } | null;
    /**
     * This redirects to a author details page
     */
    authorLink?: {
      relationTo: 'pages';
      value: string | Page;
    } | null;
    /**
     * This redirects to a tag details page
     */
    tagLink?: {
      relationTo: 'pages';
      value: string | Page;
    } | null;
  };
  monetization?: {
    /**
     * Add the publisher-id from Google AdSense Console
     */
    adSenseId?: string | null;
    /**
     * Add the measurement id from Google Analytics dashboard
     */
    measurementId?: string | null;
  };
  themeSettings: {
    lightMode: {
      primary: string;
      background: string;
      text: string;
      foreground: string;
      popover: string;
      border: string;
    };
    darkMode: {
      primary: string;
      background: string;
      text: string;
      foreground: string;
      popover: string;
      border: string;
    };
    fonts: {
      display: {
        type: 'customFont' | 'googleFont';
        customFont?: (string | null) | Media;
        remoteFont?: string | null;
        fontName?: string | null;
      };
      body: {
        type: 'customFont' | 'googleFont';
        customFont?: (string | null) | Media;
        remoteFont?: string | null;
        fontName?: string | null;
      };
    };
    radius: 'none' | 'small' | 'medium' | 'large' | 'full';
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "BrandLogo".
 */
export interface BrandLogo {
  imageUrl: string | Media;
  /**
   * Adjust to the height of the logo
   */
  height?: number | null;
  /**
   * Adjust to the width of the logo
   */
  width?: number | null;
  /**
   * This text appears below the footer image
   */
  description?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "site-settings_select".
 */
export interface SiteSettingsSelect<T extends boolean = true> {
  general?:
    | T
    | {
        title?: T;
        description?: T;
        faviconUrl?: T;
        ogImageUrl?: T;
        keywords?: T;
        currency?: T;
      };
  navbar?:
    | T
    | {
        logo?: T | BrandLogoSelect<T>;
        menuLinks?:
          | T
          | {
              group?: T;
              menuLink?:
                | T
                | {
                    type?: T;
                    newTab?: T;
                    icon?: T;
                    label?: T;
                    page?: T;
                    url?: T;
                    id?: T;
                  };
              menuLinkGroup?:
                | T
                | {
                    groupTitle?: T;
                    groupLinks?:
                      | T
                      | {
                          type?: T;
                          newTab?: T;
                          icon?: T;
                          label?: T;
                          page?: T;
                          url?: T;
                          id?: T;
                        };
                  };
              id?: T;
            };
      };
  footer?:
    | T
    | {
        logo?: T | BrandLogoSelect<T>;
        footerLinks?:
          | T
          | {
              group?: T;
              menuLink?:
                | T
                | {
                    type?: T;
                    newTab?: T;
                    icon?: T;
                    label?: T;
                    page?: T;
                    url?: T;
                    id?: T;
                  };
              menuLinkGroup?:
                | T
                | {
                    groupTitle?: T;
                    groupLinks?:
                      | T
                      | {
                          type?: T;
                          newTab?: T;
                          icon?: T;
                          label?: T;
                          page?: T;
                          url?: T;
                          id?: T;
                        };
                  };
              id?: T;
            };
        socialLinks?:
          | T
          | {
              platform?: T;
              value?: T;
              id?: T;
            };
        copyright?: T;
      };
  redirectionLinks?:
    | T
    | {
        blogLink?: T;
        productLink?: T;
        authorLink?: T;
        tagLink?: T;
      };
  monetization?:
    | T
    | {
        adSenseId?: T;
        measurementId?: T;
      };
  themeSettings?:
    | T
    | {
        lightMode?:
          | T
          | {
              primary?: T;
              background?: T;
              text?: T;
              foreground?: T;
              popover?: T;
              border?: T;
            };
        darkMode?:
          | T
          | {
              primary?: T;
              background?: T;
              text?: T;
              foreground?: T;
              popover?: T;
              border?: T;
            };
        fonts?:
          | T
          | {
              display?:
                | T
                | {
                    type?: T;
                    customFont?: T;
                    remoteFont?: T;
                    fontName?: T;
                  };
              body?:
                | T
                | {
                    type?: T;
                    customFont?: T;
                    remoteFont?: T;
                    fontName?: T;
                  };
            };
        radius?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "BrandLogo_select".
 */
export interface BrandLogoSelect<T extends boolean = true> {
  imageUrl?: T;
  height?: T;
  width?: T;
  description?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}