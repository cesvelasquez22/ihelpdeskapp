import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { landingDefaultNavigation, landingHorizontalNavigation } from './landing.navigation';

@Injectable({
    providedIn: 'root'
})
export class LandingNavigationMockApi
{
    private readonly _defaultNavigation: FuseNavigationItem[] = landingDefaultNavigation;
    private readonly _horizontalNavigation: FuseNavigationItem[] = landingHorizontalNavigation;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Navigation - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/landing/navigation')
            .reply(() => {

                // Fill horizontal navigation children using the default navigation
                this._horizontalNavigation.forEach((horizontalNavItem) => {
                    this._defaultNavigation.forEach((defaultNavItem) => {
                        if ( defaultNavItem.id === horizontalNavItem.id )
                        {
                            horizontalNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Return the response
                return [
                    200,
                    {
                        default   : cloneDeep(this._defaultNavigation),
                        horizontal: cloneDeep(this._horizontalNavigation)
                    }
                ];
            });
    }
}
