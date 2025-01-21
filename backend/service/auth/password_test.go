package auth

import (
	"errors"
	"testing"
)

func TestHashPasswor(t *testing.T) {
	testCases := []string{
		"password",
		"password",
		"password",
		"p",
		"",
	}

	for _, testCase := range testCases {
		if _, err := HashPassword(testCase); err != nil {
			if err != nil {
				t.Fatalf("was not expecting the error to exist")
			}
		}
	}
}

func TestComparePassword(t *testing.T) {
	type testCaseType struct {
		original       string
		compareAgainst string
		expect         error
	}
	testCases := []testCaseType{
		{
			original:       "password",
			compareAgainst: "password",
			expect:         nil,
		},
		{
			original:       "password",
			compareAgainst: "not equal password",
			expect:         errors.New(""),
		},
		{
			original:       "password",
			compareAgainst: "test shit",
			expect:         errors.New(""),
		},
	}

	for _, testCase := range testCases {
		hPwd, err := HashPassword(testCase.original)
		if err != nil {
			t.Fatalf("Error should not occur while hashing")
		}

		err = ComparePassword(hPwd, testCase.compareAgainst)
		if err != nil && testCase.expect == nil {
			t.Fatal("Test failed since the test was expecting error but got no error")
		}

		if err == nil && testCase.expect != nil {
			t.Fatal("Test failed since the test was not expecting error but got an error")
		}
	}

}
