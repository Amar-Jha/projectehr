// -------------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License (MIT). See LICENSE in the repo root for license information.
// -------------------------------------------------------------------------------------------------

using OpenQA.Selenium;

namespace FhirDashboard.Tests.E2E.UIPages
{
    internal class AboutMePage : BasePage
    {
        // Expected title can be read from a resource file, for the time being I have hard coded it.
        public const string ExpectedTitle = "About Me - FhirDashboard";

        public IWebElement TextToken
        {
            get
            {
                return Driver.GetElement(By.Id("token"));
            }
        }
    }
}